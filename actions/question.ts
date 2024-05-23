'use server'

import * as z from "zod";
import {QuestionSchema} from "@/schemas";
import QuestionService from "@/service/db/question";
import logger from "@/lib/logger";

export const addQuestionAction = async (
    values: z.infer<typeof QuestionSchema>,
    ExerciseId : number,
) => {
    logger.info(`Add question with text ${values.text}`)
    const validatedFields = QuestionSchema.safeParse(values);
    if (!ExerciseId){
        logger.error(`Invalid subject!`)
        return { error: "Invalid subject!" };
    }

    if (!validatedFields.success) {
        logger.error(`Invalid fields!`)
        return { error: "Invalid fields!" };
    }
    // Add course to database
    try {
        await QuestionService.addQuestion(values,ExerciseId);
    } catch (e) {
        logger.error(`Failed to add question with text ${values.text} ${e}`)
        return { error: "Failed to add this question!" + e };
    }

    return { success: "Question added!" };
}


export const deleteQuestionAction = async (questionId: number) => {
    try {
        logger.info(`Delete question with id ${questionId}`)
        await QuestionService.deleteQuestion(questionId);
    } catch (error) {
        logger.error(`Failed to delete question with id ${questionId}`)
        return { error: "Failed to delete question!" + error };
    }
}