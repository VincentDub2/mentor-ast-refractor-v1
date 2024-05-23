import {revalidateTag, unstable_cache} from "next/cache";
import db from "@/lib/db";
import {CourseSchema} from "@/schemas";
import * as z from "zod";

const CourseService = {
    getCourseFromSubject : unstable_cache(
        async (subjectId: number) => {
            return db.course.findMany({
                where: {
                    subjectId,
                }
            });
        },[`courses`],
        {
            tags: [`courses`],
        }
    ),
    addCourse : async (course: z.infer<typeof CourseSchema>,subjectId:number) => {
        try {
            return await db.course.create({
                data: {
                    title: course.name,
                    type: course.type,
                    subjectId: subjectId
                },include: {
                    subject: true
                }


            });

        } catch (error) {
            //On renvoie l'erreur
            console.error(error);
            throw new Error("Impossible de créer le cours : " + error);
        }finally {
            revalidateTag('courses');
        }
    }

}

export default CourseService;