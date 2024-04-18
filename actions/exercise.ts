'use server';
import * as z from "zod";
import {ExerciseSchema} from "@/schemas";
import {addExercise, submitAnswer} from "@/data/exercice";
import db from "@/lib/db";
import {SubmitAnswer} from "@/type/model";


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
        await addExercise(values, subjectId);
        console.log("exercise added");
    } catch (e) {
        console.error(e);
        return { error: "Failed to add course!" + e };
    }

    return { success: "Course added!" };
}

export const submitAnswerAction = async (answer : SubmitAnswer) => {
    try {
        await submitAnswer(answer);
    }catch (e) {
        console.error(e);
        return { error: "Failed to submit answer!" + e };
    }
    return { success: "Answer submitted!" };

}


export const getExercisesFromSubject = async (subjectId: number) => {
    return db.exercise.findMany({
        where: {
            subjectId,
        },
        include: {
            subject: true,
        },
    });
};