'use server'
import * as z from "zod";
import {SectionVideoSchema} from "@/schemas";
import SectionVideoService from "@/service/db/sectionVideo";
import logger from "@/lib/logger";

export const addSectionVideoAction = async (
    values: z.infer<typeof SectionVideoSchema>,
    subjectId: number,
)=>{

    logger.info(`Add section with values ${values} and subjectId ${subjectId}`)
    const validatedFields = SectionVideoSchema.safeParse(values);

    if (!validatedFields.success) {
        logger.error(`Invalid fields ${values}`)
        return { error: "Invalid fields!" };
    }
    try {
        await SectionVideoService.addSection(validatedFields.data.name, validatedFields.data.description, Number(validatedFields.data.position), subjectId)
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to add section ${values}`)
            return { error:error.message };
        }
        logger.error(`Failed to add section ${values}`)
        return { error: "Unknown error!" };
    }

    return { success: "Subject added!" };
}

export const delectSectionVideoAction = async (
    id: number,
)=>{
    logger.info(`Delete section with id ${id}`)
    try {
        await SectionVideoService.deleteSection(id)
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to delete section with id ${id}`)
            return { error:error.message };
        }
        logger.error(`Failed to delete section with id ${id}`)
        return { error:"Erreur inconnu" };
    }

    return { success: "Section deleted!" };
}

export const updateSectionVideoAction = async (
    id: number,
    values: z.infer<typeof SectionVideoSchema>,
)=>{
    logger.info(`Update section with id ${id} and values ${values}`)
    const validatedFields = SectionVideoSchema.safeParse(values);

    if (!validatedFields.success) {
        logger.error(`Invalid fields ${values}`)
        return { error: "Invalid fields!" };
    }
    try {
        await SectionVideoService.updateSection(id,validatedFields.data.name,validatedFields.data.description,Number(validatedFields.data.position))
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to update section with id ${id} and values ${values}`)
            return { error:error.message };
        }
        logger.error(`Failed to update section with id ${id} and values ${values}`)
        return { error: "Failed to add subject!" };
    }

    return { success: "Subject added!" };
}

export const getSectionsBySubjectIdAction = async (subjectId: number) => {
    logger.info(`Get sections with subjectId ${subjectId}`)
    try {
        return  await SectionVideoService.getSectionForSubject(subjectId);
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get sections with subjectId ${subjectId}`)
            return { error:error.message };
        }
        logger.error(`Failed to get sections with subjectId ${subjectId}`)
        return { error: "Failed to get sections!" };
    }
}