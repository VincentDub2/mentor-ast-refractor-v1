import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import prisma from "@/lib/db";
import UserService from "@/service/db/user";
import {UserRole} from "@prisma/client";
import AccountService from "@/service/db/account";
import logger from "@/lib/logger";


export const {
    handlers,
    signIn,
    signOut,
    auth } = NextAuth({
    pages: {
        signIn: "/sign",
        error: "/auth/error",
    },
    callbacks: {
        async signIn({ user, account }) {
            logger.info("Sign in callback");
            if (account?.provider !== "credentials") return true;

            if (!user.id) {
                logger.error("User id not found");
                return false;
            }

            const existingUser = await UserService.getUserById(user.id);

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) {
                logger.error("User email not verified");
                return false;
            }

            return true;
        },
        async session({ token, session }) {
            logger.info("Session callback");

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }


            if (session.user) {
                session.user.name = token.name;
                if (token.email) session.user.email = token.email;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {

            if (!token.sub) return token;

            const existingUser = await UserService.getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await AccountService.getAccountByUserId(
                existingUser.id
            );

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})