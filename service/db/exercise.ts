import db from "@/lib/db";
import {revalidateTag, unstable_cache} from "next/cache";
import {SubmitAnswer} from "@/type/model";
import {ExerciseSchema} from "@/schemas";
import * as z from "zod";


const ExerciseService = {
    getExerciseFromSubject : unstable_cache(
        async (subjectId: number,UserId?:string) => {
            try {
                return await db.exercise.findMany({
                    where: {
                        subjectId,
                    },
                    include: {
                        _count: {
                            select : {
                                questions: true
                            }
                        },
                        ExerciseDone: {
                            where: {
                                userId: UserId
                            },orderBy: {
                                Date: 'desc'
                            }
                        }
                    }
                });
            }catch (e) {
                console.error(e);
            }
        },[`exercises`],
        {
            tags: [`exercises`],
        }
    ),

   getExercise : unstable_cache(
        async (ExerciseId : number,UserId?:string)  => {
            try {
                return await db.exercise.findUnique({
                    where: {
                        id: ExerciseId
                    },
                    include: {
                        questions: {
                            include: {
                                options: true
                            }
                        },
                        ExerciseDone: {
                            where: {
                                userId: UserId
                            }
                        }
                    }});
            }catch (e) {
                console.error(e);
            }
        },[`OneExercise`],
        {
            tags: [`OneExercise`],
        }
    ),
    addExercise : async (exercise: z.infer<typeof ExerciseSchema>,subjectId:number) => {
        try {
            return await db.exercise.create({
                data: {
                    title: exercise.name,
                    type: exercise.type,
                    difficulty: exercise.difficulty,
                    subjectId: subjectId
                },include: {
                    subject: true
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("We can't create exercise : " + error);
        }finally {
            revalidateTag('OneExercise');
        }
    },

    submitAnswer : async (data : SubmitAnswer ) => {
        try {
            return await db.exerciseDone.create({
                data: {
                    note: data.note,
                    time: data.time,
                    userId: data.userId,
                    exerciseId: data.exerciseId,
                    response: {
                        create:
                        data.answers
                    }
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("We can't submit answers : " + error);
        }
    },
    getExerciseDone : async (UserId : string) => {
        try {
            return await db.exerciseDone.findMany({
                where: {
                    userId: UserId
                },
                include: {
                    exercise: true
                }
            });
        }catch (e) {
            console.error(e);
        }
    },
    /**
     * Get exercises by subjectId
     * @param subjectId
     * @param UserId
     */
    getExerciseFromSubjectNoCache : async (subjectId: number,UserId?:string) => {
            return db.exercise.findMany({
                where: {
                    subjectId,
                },
                include: {
                    _count: {
                        select: {
                            questions: true
                        }
                    },
                    ExerciseDone: {
                        where: {
                            userId: UserId
                        }, orderBy: {
                            Date: 'desc'
                        }
                    }
                }
            }
            );
    },
    /**
     * Get an exercise by his id but without cache
     * @param ExerciseId
     */
    getExerciseNoCache : async (ExerciseId : number) =>{
        return db.exercise.findUnique({
            where: {
                id: ExerciseId
            },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                },
            }
        });
    },
    /**
     * Get de response of an user to an exercise
     * @param UserId
     * @param exerciseId
     */
     GetAnswerFromAnExercise: unstable_cache(
        async (exerciseId : number,userId : string)  => {
            try {
                return await db.exerciseDone.findFirst({
                    where: {
                        exerciseId: exerciseId,
                        userId: userId
                    },include: {
                        response: true
                    },orderBy: {
                        id: 'desc'
                    }
                });
            }catch (e) {
                throw new Error("We can't get response : " + e);
            }
        },[`ResponseSubmit`],
        {
            tags: [`ResponseSubmit`],
        }
    ),
    /**
     *Get the subject of an exercise
     * @param exerciseId
     */
    getSubjectFromExercise : async (exerciseId : number) => {
       const res = await db.exercise.findUnique({
            where: {
                id: exerciseId
            },
            include: {
                subject: true
            }
        });
       return res?.subject;
    }


}

export default ExerciseService;