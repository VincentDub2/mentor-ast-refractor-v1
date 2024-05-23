import {Exercise, ExerciseDone, Prisma, Question, ResponseSubmit} from "@prisma/client";
import prisma from "@/lib/db";

export interface VideoModel {
    title: string;
    description?: string;
    youtubeUrl: string;
    subjectId?: number;
    pathwayId?: number;
    availableFromDate: Date;
    userId?: string;

}

export interface SubjectModel {
    name: string;
    pathwayId: number;
}


export type option = {
    id: number;
    letter: string;
    text: string;
    questionId: number;
}

export type question = {
    id : number;
    text: string;
    options: option[];
    correctAnswerId: string;
    explanation?: string;
    exerciseId: number;
}

export interface ExerciseModel {
    id: number;
    title: string;
    type: string;
    difficulty: string;
    subjectId: number;
    questions: question[];
}



export type QuestionComplete = Question & {
    options: option[];

}
export type ExerciseComplete = Exercise & {
    questions : QuestionComplete[];
}

export type ResponseUser = ExerciseDone & {
    response:ResponseSubmit[]
}
export interface SubmitAnswer {
    userId: string;
    exerciseId: number;
    note: number;
    time: number;
    answers: {
        response: string;
        questionId: number;
    }[]
}

export interface ExerciseDoneModelWithExercise extends ExerciseDone {
    exercise: Exercise;
}
