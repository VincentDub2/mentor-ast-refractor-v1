'use server'
import * as z from "zod";
import {ContactUsSchema} from "@/schemas";
import {sendEmailToAdmin} from "@/lib/mail";
import UserService from "@/service/db/user";
import logger from "@/lib/logger";

export const contactUs = async (
    values: z.infer<typeof ContactUsSchema>,
)=> {
    const validatedFields = ContactUsSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        logger.info("Sending email to admin");
        const email = await UserService.getAdminEmails();
        for (const e of email){
            if (e.email) {
                await sendEmailToAdmin(e.email,JSON.stringify(values));
            }
        }
    } catch (e) {
        logger.error("Error sending email"+e);
        console.error(e);
        return { error: "Erreur lors de l'envoie de l'email" + e };
    }

    return { success: "Email envoyé!" };
}