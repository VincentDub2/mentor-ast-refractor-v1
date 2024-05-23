'use server';
import * as z from "zod";
import {CourseSchema} from "@/schemas";
import CourseService from "@/service/db/course";
import logger from "@/lib/logger";


export const addCourse = async (
    values: z.infer<typeof CourseSchema>,
    subjectId: number,
) => {
    logger.info(`Add course with name ${values.name}`)
    const validatedFields = CourseSchema.safeParse(values);


    if (!subjectId){
        logger.error(`Invalid subject!`)
        return { error: "Invalid subject!" };
    }

    if (!validatedFields.success) {
        logger.error(`Invalid fields!`)
        return { error: "Invalid fields!" };
    }
    // Add course to database
    try {
        await CourseService.addCourse(values, subjectId);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(`Failed to add course with name ${values.name} ${e}`)
            return { error: "Failed to add course!" + e };
        }
        logger.error(`Failed to add course with name ${values.name}`)
        return { error: "Failed to add course!" };
    }

    return { success: "Course added!" };
}


export const getCourseFromSubject = async (subjectId: number) => {
    logger.info(`Get courses with subjectId ${subjectId}`)
    try {
        return await CourseService.getCourseFromSubject(subjectId) ?? { error: "Courses not found!" };
    }catch (e) {
        if (e instanceof Error) {
            logger.error(`Failed to get courses with subjectId ${subjectId}`)
            return { error: e.message };
        }
        logger.error(`Failed to get courses with subjectId ${subjectId}`)
        return { error: "Failed to get courses!" };
    }
}