'use server';

import * as z from "zod";
import {SubjectSchema} from "@/schemas";
import {addSubject} from "@/data/subject";

export const addSubjectAction = async (
    values: z.infer<typeof SubjectSchema>,
    pathwayName: string,
)=>{
    const validatedFields = SubjectSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        await addSubject(validatedFields.data.name,pathwayName)
    } catch (error) {
        return { error: "Failed to add subject!" };
    }

    return { success: "Subject added!" };
}