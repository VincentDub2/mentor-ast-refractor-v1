'use server';

import * as z from "zod";
import {SubjectSchema} from "@/schemas";
import SubjectService from "@/service/db/subject";
import logger from "@/lib/logger";
import {Subject} from "@prisma/client";

export const addSubjectAction = async (
    values: z.infer<typeof SubjectSchema>,
    pathwayName: string,
)=>{
    logger.info(`Add subject with values ${values} and pathwayName ${pathwayName}`)
    const validatedFields = SubjectSchema.safeParse(values);

    if (!validatedFields.success) {
        logger.error(`Invalid fields ${values}`)
        return { error: "Invalid fields!" };
    }
    try {
        await SubjectService.addSubject(validatedFields.data.name,pathwayName)
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to add subject ${values}`)
            return { error:error.message };
        }
        logger.error(`Failed to add subject ${values}`)
        return { error: "Failed to add subject!" };
    }
    logger.info(`Subject added with values ${values} and pathwayName ${pathwayName}`)
    return { success: "Subject added!" };
}

export const getSubjectsByPathwayNameAction = async (pathwayName: string) => {
    logger.info(`Get subjects with pathwayName ${pathwayName}`)
    try {
        return  await SubjectService.getSubjectsByPathwayName(pathwayName);
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get subjects with pathwayName ${pathwayName}`)
            return { error:error.message };
        }
        logger.error(`Failed to get subjects with pathwayName ${pathwayName}`)
        return { error: "Failed to get subjects!" };
    }
}

/**
 * Get subject by name and pathway name
 * @param subjectName
 * @param pathwayName
 * @returns {Promise<Subject | {error: string}>}
 */

export const getSubjectByNameAndNamePathwayAction = async (subjectName: string, pathwayName: string): Promise<Subject | {error: string}> => {
    logger.info(`Get subject with subjectName ${subjectName} and pathwayName ${pathwayName}`)
    try {
        return await SubjectService.getSubjectByNameAndNamePathway(subjectName, pathwayName) ?? { error: "Subject not found!" };
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get subject with subjectName ${subjectName} and pathwayName ${pathwayName}`)
            return { error:error.message };
        }
        logger.error(`Failed to get subject with subjectName ${subjectName} and pathwayName ${pathwayName}`)
        return { error: "Failed to get subject!" };
    }
}

export const getSubjectFromExerciseAction = async (exerciseId: number): Promise<Subject | {error: string}> => {
    logger.info(`Get subject with exerciseId ${exerciseId}`)
    try {
        return await SubjectService.getSubjectFromExercise(exerciseId) ?? { error: "Subject not found!" };
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get subject with exerciseId ${exerciseId}`)
            return { error:error.message };
        }
        logger.error(`Failed to get subject with exerciseId ${exerciseId}`)
        return { error: "Failed to get subject!" };
    }
}

/**
 * Get pathway by subject id
 * @param subjectId
 */
export const getPathwayFromSubjectAction = async (subjectId: number) => {
    logger.info(`Get pathway with subjectId ${subjectId}`)
    try {
        return await SubjectService.getPathwayFromSubject(subjectId) ?? {error: "Pathway not found!"};
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get pathway with subjectId ${subjectId}`)
            return {error: error.message};
        }
        logger.error(`Failed to get pathway with subjectId ${subjectId}`)
        return {error: "Failed to get pathway!"};
    }
}