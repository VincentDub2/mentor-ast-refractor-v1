"use server";

import db from "@/lib/db";
import UserService from "@/service/db/user";
import TokenService from "@/service/db/token";

export const newVerification = async (token: string) => {
  const existingToken = await TokenService.verificationToken(token);

  if (!existingToken) {
    return { error: "Oups le token n'existe pas!"};
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Le token a expiré!"};
  }

  const existingUser = await UserService.getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: "Email verified!" };
};
