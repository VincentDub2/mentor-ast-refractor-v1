'use server'
import * as z from "zod";
import {ContactUsSchema} from "@/schemas";
import {sendEmailToAdmin} from "@/lib/mail";
import {getEmailAdmin} from "@/data/admin";

export const contactUs = async (
    values: z.infer<typeof ContactUsSchema>,
)=> {
    const validatedFields = ContactUsSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    // Add course to database
    try {
        const email = await getEmailAdmin();
        for (const e of email){
            if (e.email) {
                await sendEmailToAdmin(e.email,JSON.stringify(values));
            }
        }
    } catch (e) {
        console.error(e);
        return { error: "Failed to add course!" + e };
    }

    return { success: "Course added!" };
}