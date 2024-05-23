import {QuestionSchema} from "@/schemas";
import db from "@/lib/db";
import {revalidateTag} from "next/cache";
import * as z from "zod";

const QuestionService = {

   addQuestion : async (exercise: z.infer<typeof QuestionSchema>,Exercise :number) => {
        try {
            const question = await db.question.create({
                data: {
                    text: exercise.text,
                    exerciseId: Exercise,
                    correctAnswerId: exercise.correctAnswerId,
                    explanation : exercise.explanation
                }
            });

            const optionA = await db.option.create({
                data: {
                    text: exercise.optionA,
                    questionId: question.id,
                    letter: 'A'
                }
            });

            const optionB = await db.option.create({
                data: {
                    text: exercise.optionB,
                    questionId: question.id,
                    letter: 'B'
                }
            });

            const optionC = await db.option.create({
                data: {
                    text: exercise.optionC,
                    questionId: question.id,
                    letter: 'C'
                }
            });

            const optionD = await db.option.create({
                data: {
                    text: exercise.optionD,
                    questionId: question.id,
                    letter: 'D'
                }
            });

            if (exercise.optionE) {
                const optionE = await db.option.create({
                    data: {
                        text: exercise.optionE,
                        questionId: question.id,
                        letter: 'E'
                    }
                });
            }
        } catch (error) {
            console.error(error);
            throw new Error("We can't create exercise : " + error);
        }finally {
            revalidateTag('OneExercise');
        }
    },
    deleteQuestion : async (questionId: number) => {
        try {
            await db.question.delete({
                where: {
                    id: questionId
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("We can't delete this question : " + error);
        }finally {
            revalidateTag('OneExercise');
        }
    }

}

export default QuestionService;