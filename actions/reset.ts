"use server";

import * as z from "zod";

import {ResetSchema} from "@/schemas";
import {sendPasswordResetEmail} from "@/lib/mail";
import {generatePasswordResetToken} from "@/lib/tokens";
import UserService from "@/service/db/user";
import logger from "@/lib/logger";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  logger.info(`Reset password with email ${values.email}`);

  if (!validatedFields.success) {
    logger.error(`Invalid email!`);
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await UserService.getUserByEmail(email);

  if (!existingUser) {
    logger.error(`Email not found!`);
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
}