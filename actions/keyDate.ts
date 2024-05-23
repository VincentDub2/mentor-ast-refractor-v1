'use server'

import * as z from "zod";
import {ImportantDateSchema} from "@/schemas";
import ImportanteDateService from "@/service/db/importanteDate";
import logger from "@/lib/logger";

/**
 *Permet d'ajouter une date importante
 * @param values
 * @param pathId
 */
export const addKeyDateAction = async (
    values: z.infer<typeof ImportantDateSchema>,
    pathId: number
) => {

    logger.info(`Add important date with values ${values} and pathId ${pathId}`)

    const validatedFields = ImportantDateSchema.safeParse(values);

    if (!validatedFields.success) {
        logger.error(`Invalid fields ${values}`)
        return { error: "Invalid fields!" };
    }
    try {
        await ImportanteDateService.addImportantDate(validatedFields.data.content,validatedFields.data.date,pathId)
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to add important date ${values}`)
            return { error:error.message };
        }
        logger.error(`Failed to add important date ${values}`)
        return { error: "Unknown error!" };
    }

    logger.info(`Important date added with values ${values} and pathId ${pathId}`)
    return {
        success: "Subject added!"
    };
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
    logger.info(`Delete important date with id ${id}`)
    try {
        await ImportanteDateService.deleteImportantDate(id)
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to delete important date with id ${id}`)
            return { error:error.message };
        }
        logger.error(`Failed to delete important date with id ${id}`)
        return { error:"Erreur inconnu" };
    }
    logger.info(`Important date deleted with id ${id}`)
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
    logger.info(`Update important date with id ${id} and values ${values}`)
    const validatedFields = ImportantDateSchema.safeParse(values);

    if (!validatedFields.success) {
        logger.error(`Invalid fields ${values}`)
        return { error: "Invalid fields!" };
    }
    try {
        await ImportanteDateService.updateImportantDate(id,validatedFields.data.content,validatedFields.data.date)
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to update important date with id ${id} and values ${values}`)
            return { error:error.message };
        }
        logger.error(`Failed to update important date with id ${id} and values ${values}`)
        return { error: "Failed to add subject!" };
    }
    logger.info(`Important date updated with id ${id} and values ${values}`)
    return { success: "Subject added!" };
}


export const getKeyDatesByPathwayIdAction = async (pathId: number) => {
    logger.info(`Get important dates with pathId ${pathId}`)
    try {
        return await ImportanteDateService.getImportantDateFromPath(pathId);
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get important dates with pathId ${pathId}`)
            return { error:error.message };
        }
        logger.error(`Failed to get important dates with pathId ${pathId}`)
        return { error: "Failed to get subjects!" };
    }
}