'use server'
import * as z from "zod";
import {SectionVideoSchema} from "@/schemas";
import {addSection, deleteSection, updateSection} from "@/data/sectionVideo";

export const addSectionVideoAction = async (
    values: z.infer<typeof SectionVideoSchema>,
    subjectId: number,
)=>{
    const validatedFields = SectionVideoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        await addSection(validatedFields.data.name,validatedFields.data.description,Number(validatedFields.data.position),subjectId)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }
        return { error: "Unknown error!" };
    }

    return { success: "Subject added!" };
}

export const delectSectionVideoAction = async (
    id: number,
)=>{
    try {
        await deleteSection(id)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }
        return { error:"Erreur inconnu" };
    }

    return { success: "Section deleted!" };
}

export const updateSectionVideoAction = async (
    id: number,
    values: z.infer<typeof SectionVideoSchema>,
)=>{
    const validatedFields = SectionVideoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        await updateSection(id,validatedFields.data.name,validatedFields.data.description,Number(validatedFields.data.position))
    } catch (error) {
        return { error: "Failed to add subject!" };
    }

    return { success: "Subject added!" };
}