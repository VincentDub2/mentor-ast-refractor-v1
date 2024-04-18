import * as z from "zod";
import {typeCourse, typeDifficulty, typeExercise, UserRole} from "@prisma/client";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "New password is required!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Password is required!",
        path: ["password"]
    })

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const SubjectSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

export const CourseSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    type: z.enum([typeCourse.COURS, typeCourse.EXERCICE, typeCourse.INFORMATION]),
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

export const ExerciseSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    difficulty: z.enum([typeDifficulty.EASY, typeDifficulty.MEDIUM, typeDifficulty.HARD]),
    type: z.enum([typeExercise.EXAM,typeExercise.TRAINING, typeExercise.PRACTICE]),
});


export const QuestionSchema = z.object({
    text: z.string().min(1, {
        message: "Question is required",
    }),
    explanation: z.string().min(1, {
        message: "Explanation is required",
    }),
    optionA: z.string().min(1, {
        message: "Option A is required",
    }),
    optionB: z.string().min(1, {
        message: "Option B is required",
    }),
    optionC: z.string().min(1, {
        message: "Option C is required",
    }),
    optionD: z.string().min(1, {
        message: "Option D is required",
    }),
    optionE: z.string().optional(),
    correctAnswerId: z.string().min(1, {
        message: "Correct answer is required",
    }),
});


export const ContactUsSchema = z.object({
    lastName: z.string().min(1, {
        message: "Name is required",
    }),
    firstName: z.string().min(1, {
        message: "Name is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    phoneNumber: z.string().regex(/^\+33\d{9}$/, "Numéro de téléphone invalide."),
    postalCode: z.string().length(5, "Le code postal doit contenir 5 chiffres."),
    studyLevel: z.string().min(1, {
        message: "Study level is required",
    }),
    yearContest: z.string().min(1, {
        message: "Year contest is required",
    }),
    message: z.string().min(1, {
        message: "Message is required",
    }),
});

export const SectionVideoSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    position: z.string().min(1, {
        message: "Position is required",
    }),
});


export const VideoSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
    youtubeUrl: z.string().url({
        message: "URL is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    availableFromDate: z.date(),
});

export const ImportantDateSchema = z.object({
    content: z.string().min(1, {
        message: "Description is required",
    }),
    date: z.date(),
});
