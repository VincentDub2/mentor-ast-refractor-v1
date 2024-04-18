'use server';
import * as z from "zod";
import {CourseSchema} from "@/schemas";
import {addCourse as dataAddCourse} from "@/data/course";

export const addCourse = async (
    values: z.infer<typeof CourseSchema>,
    subjectId: number,
) => {
    const validatedFields = CourseSchema.safeParse(values);
    console.log(validatedFields);
    if (!subjectId){
        return { error: "Invalid subject!" };
    }

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    // Add course to database
    try {
        await dataAddCourse(values, subjectId);
    } catch (e) {
        console.error(e);
        return { error: "Failed to add course!" };
    }

    return { success: "Course added!" };
}