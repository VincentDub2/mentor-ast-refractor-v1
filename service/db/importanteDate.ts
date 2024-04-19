import db from "@/lib/db";
import {revalidateTag, unstable_cache} from "next/cache";
import {KeyDate} from "@prisma/client";

 const ImportanteDateService = {
    /**
     * Get all important date from the database using the unstable_cache function from next14
     * @param pathwayId
     * @returns {Promise<KeyDate[] | undefined>}
     */
    getImportantDateFromPath : unstable_cache(
        async (pathId : number) => {
            return db.keyDate.findMany({
                where: {
                    pathId: pathId
                },orderBy: {
                    date: 'asc'
                }
            });
        },
        ['keyDate'],
        {
            tags: ['keyDate'],
        }
    ),
    /**
     * Add a important date to the database using the unstable_cache function from next14
     * @param content
     * @param date
     * @param pathwayId
     * @returns {Promise<KeyDate | undefined>}
     */
   addImportantDate : async (content:string,date:Date,pathwayId:number): Promise<KeyDate | undefined> => {
        try {
            return db.keyDate.create({
                data: {
                    content: content,
                    pathId: pathwayId,
                    date: date
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('keyDate')
        }
    },

    /**
     * Update a important date in the database using the unstable_cache function from next14
     * @param id
     * @param content
     * @param date
     * @returns {Promise<KeyDate | undefined>}
     */
    updateImportantDate : async (id: number, content:string,date:Date): Promise<KeyDate | undefined> => {
        try {
            return db.keyDate.update({
                where: {
                    id: id
                },
                data: {
                    content: content,
                    date: date
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('keyDate')
        }
    },

    /**
     * Delete a important date in the database using the unstable_cache function from next14
     * @param id
     * @returns {Promise<KeyDate | undefined>}
     */

    deleteImportantDate : async (id: number): Promise<KeyDate | undefined> => {
        try {
            return db.keyDate.delete({
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
            revalidateTag('keyDate')
        }
    }

}

export default ImportanteDateService;