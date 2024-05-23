'use server';
import * as z from "zod";
import {ExerciseSchema} from "@/schemas";
import {SubmitAnswer} from "@/type/model";
import logger from "@/lib/logger";
import ExerciseService from "@/service/db/exercise";
import {ExerciseDone} from "@prisma/client";


export const revalidateTag = async (tag: string) => {
    await revalidateTag(tag);
}
export const addExerciseAction = async (
    values: z.infer<typeof ExerciseSchema>,
    subjectId: number,
) => {
    const validatedFields = ExerciseSchema.safeParse(values);
    if (!subjectId){
        return { error: "Invalid subject!" };
    }

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    // Add course to database
    try {
        await ExerciseService.addExercise(values, subjectId);
        console.log("exercise added");
    } catch (e) {
        console.error(e);
        return { error: "Failed to add course!" + e };
    }

    return { success: "Course added!" };
}

export const submitAnswerAction = async (answer : SubmitAnswer) => {
    try {
        await ExerciseService.submitAnswer(answer);
    }catch (e) {
        console.error(e);
        return { error: "Failed to submit answer!" + e };
    }
    return { success: "Answer submitted!" };

}

/**
 * Get exercises by subjectId
 * @param subjectId
 * @param userId
 */
export const getExercisesBySubjectIdAction = async (subjectId: number,userId?:string) => {
    logger.info(`Get exercises with subjectId ${subjectId}`)
    try {
        return await ExerciseService.getExerciseFromSubjectNoCache(subjectId,userId) ?? { error: "Exercises not found!" };
    }catch (e) {
        if (e instanceof Error) {
            logger.error(`Failed to get exercises with subjectId ${subjectId}`)
            return { error: e.message };
        }
        logger.error(`Failed to get exercises with subjectId ${subjectId}`)
        return { error: "Failed to get exercises!" + e };
    }

}


/**
 * Get all exercises done by the user
 * @param userId
 * @returns {Promise<ExerciseDone[] | {error: string}>}
 */

export const getExercisesDoneByUserIdAction = async (userId: string): Promise<ExerciseDone[] | {error: string}> => {
    try {
        logger.info(`Get exercises done by userId ${userId}`)
        return await ExerciseService.getExerciseDone(userId) ?? {error: "No exercises found!"};
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get exercises done by userId ${userId}`)
            return {error: error.message};
        }
        logger.error(`Failed to get exercises done by userId ${userId}`)
        return {error: "Failed to get exercises done!"};
    }
}

/**
 * Get an exercise by its id
 * @param id
 */
export const getExerciseByIdAction = async (id: number) => {
    try {
        return await ExerciseService.getExerciseNoCache(id) ?? {error: "Exercise not found!"};
    } catch (error) {
        if (error instanceof Error) {
            return {error: error.message};
        }
        return {error: "Failed to get exercise!"};
    }
}

/**
 * get the response of an exercise
 * @param exerciseId
 * @param userId
 */
export const getResponseSubmitAction = async (exerciseId: number, userId: string) => {
    try {
        return await ExerciseService.GetAnswerFromAnExercise(exerciseId, userId) ?? {error: "Response not found!"};
    } catch (error) {
        if (error instanceof Error) {
            return {error: error.message};
        }
        return {error: "Failed to get response!"};
    }
}
