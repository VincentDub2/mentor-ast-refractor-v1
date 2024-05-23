import {revalidateTag, unstable_cache} from "next/cache";
import db from "@/lib/db";

const SectionVideoService = {
    /**
     * Get all sections from the database by the subjectId
     * @param subjectId
     * @returns {Promise<SectionVideo[] | undefined>}
     */

    getSectionForSubject : unstable_cache(
        async (subjectId : number) => {
            return db.sectionVideo.findMany({
                where: {
                    subjectId: subjectId
                },orderBy: {
                    position: 'asc'
                }
            });
        },
        ['sectionVideo'],
        {
            tags: ['sectionVideo'],
        }
    ),

    /**
     * Add a section to the database
     * @param name
     * @param description
     * @param position
     * @param subjectId
     */


    addSection : async (name: string,description:string,position:number,subjectId: number) => {
        try {
            return await db.sectionVideo.create({
                data: {
                    name: name,
                    description: description,
                    subjectId: subjectId,
                    position: position
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('sectionVideo')
        }
    },
    /**
     * Update a section in the database
     * @param id
     * @param name
     * @param description
     * @param position
     */

   updateSection : async (id: number, name: string,description:string,position:number) => {
        try {
            return db.sectionVideo.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    description: description,
                    position: position
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('sectionVideo')
        }
    },
    /**
     * Delete a section from the database
     * @param id
     */
    deleteSection : async (id: number) => {
        try {
            return db.sectionVideo.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('sectionVideo')
        }
    }
}
export default SectionVideoService;