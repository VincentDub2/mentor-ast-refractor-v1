'use server'

import * as z from "zod";
import {ImportantDateSchema} from "@/schemas";
import {addImportantDate, deleteImportantDate, updateImportantDate} from "@/data/importanteDate";

/**
 *Permet d'ajouter une date importante
 * @param values
 * @param pathId
 */
export const addKeyDateAction = async (
    values: z.infer<typeof ImportantDateSchema>,
    pathId: number
) => {
    const validatedFields = ImportantDateSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        await addImportantDate(validatedFields.data.content,validatedFields.data.date,pathId)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }
        return { error: "Unknown error!" };
    }

    return { success: "Subject added!" };
}

/**
 *Permet de supprimer une date importante
 * @param id
 * @returns {Promise<{error: string} | {success: string}>}
 */

/**
 * Permet de supprimer une date importante
 * @param id
 */
export const deleteKeyDateAction = async (
    id: number,
)=>{
    try {
        await  deleteImportantDate(id)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }
        return { error:"Erreur inconnu" };
    }

    return { success: "Section deleted!" };
}

/**
 * Permet de mettre à jour une date importante
 * @param id
 * @param values
 */
export const updateKeyDateAction = async (
    id: number,
    values: z.infer<typeof ImportantDateSchema>,
)=>{
    const validatedFields = ImportantDateSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        await updateImportantDate(id,validatedFields.data.content,validatedFields.data.date)
    } catch (error) {
        return { error: "Failed to add subject!" };
    }

    return { success: "Subject added!" };
}