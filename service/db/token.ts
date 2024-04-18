import db from "@/lib/db";

const TokenService = {
    verificationToken: async (token: string) => {
        try {
            return await db.verificationToken.findUnique({
                where: { token }
            });

        } catch {
            return null;
        }
    },
    verificationTokenByEmail: async (email: string) => {
        try {
            return  db.verificationToken.findFirst({
                where: { email }
            });
        } catch {
            return null;
        }
    },
    passwordResetToken: async (token: string) => {
        try {
            return db.passwordResetToken.findUnique({
                where: { token }
            });
        } catch {
            return null;
        }
    },
    passwordResetTokenByEmail: async (email: string) => {
        try {
            return db.passwordResetToken.findFirst({
                where: { email }
            });
        } catch {
            return null;
        }
    }
}

export default TokenService;