'use server'

import * as z from "zod";
import {QuestionSchema} from "@/schemas";
import {addQuestion, deleteQuestion} from "@/data/question";

export const addQuestionAction = async (
    values: z.infer<typeof QuestionSchema>,
    ExerciseId : number,
) => {
    const validatedFields = QuestionSchema.safeParse(values);
    if (!ExerciseId){
        return { error: "Invalid subject!" };
    }

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    // Add course to database
    try {
        await addQuestion(values,ExerciseId);
        console.log("Exercise added");
    } catch (e) {
        console.error(e);
        return { error: "Failed to add this question!" + e };
    }

    return { success: "Question added!" };
}


export const deleteQuestionAction = async (questionId: number) => {
    try {
        await deleteQuestion(questionId);
    } catch (error) {
        console.error(error);
        throw new Error("We can't delete this question : " + error);
    }
}