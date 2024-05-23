import {revalidateTag, unstable_cache} from "next/cache";
import db from "@/lib/db";

const SubjectService = {
    /**
     * Get all subjects from the database by the name of the pathway
     * @param NameParcours
     */
    getSubjectsByPathwayName : async (NameParcours: string) => {
        try {
            const subjects = await db.pathway.findMany({
                where: {
                    name: NameParcours,
                },
                include: {
                    subjectInPathway: {
                        include: {
                            subject: true,
                        },
                    },
                },
            });
            const subject = subjects.flatMap(pathway => pathway.subjectInPathway.map(sip => sip.subject));
            console.log('data subjects',subject);
            return subject;
        }catch (error) {
            console.error(error);
        }
    },
    /**
     * Get all subjects from the database by the name of the pathway using the unstable_cache function from next14
     * @param NameParcours
     */
    getSubjectByPatchNameCache : unstable_cache(
        async (NameParcours: string) => {
            const subjects = await db.pathway.findMany({
                where: {
                    name: NameParcours,
                },
                include: {
                    subjectInPathway: {
                        include: {
                            subject: true,
                        },
                    },
                },
            });
            const subject = subjects.flatMap(pathway => pathway.subjectInPathway.map(sip => sip.subject));;
            return subject;
        },
        ['subject'],
        {
            tags: ['subject'],
        }
    ),

    /**
     * Get a subject from the database by the name of the subject and the name of the pathway using the unstable_cache function from next14
     * @param name
     * @param pathwayName
     */

    getSubjectByNameAndNamePathway : unstable_cache(
        async (name: string, pathwayName: string) => {
            const subject = await  db.subject.findFirst({
                where: {
                    name: name,
                    pathways: {
                        some: {
                            pathway: {
                                name: pathwayName,
                            },
                        },
                    },
                },
                include: {
                    pathways: {
                        include: {
                            pathway: true,
                        },
                    },
                },});
            console.log('subject',subject);
            return subject;
        },['subjectId'],
        {
            tags: ['subject'],
        }
    ),
    /**
     * Add a subject to the database
     * @param name
     * @param pathwayName
     */
    addSubject : async (name: string, pathwayName:string) => {
        try {
            const pathway = await db.pathway.findUnique({
                where: {
                    name: pathwayName,
                },
            });

            if (!pathway) {
                throw new Error(`Pathway "${pathwayName}" not found`);
            }

            // Étape 2: Créer le sujet et l'associer au parcours trouvé
            return await db.subject.create({
                data: {
                    name: name,
                    pathways: {
                        create: [{
                            pathwayId: pathway.id,
                        }],
                    },
                },
            });
        }catch (error) {
            console.error(error);
        }finally {
            revalidateTag('subject');
        }

    }
}

export default SubjectService;