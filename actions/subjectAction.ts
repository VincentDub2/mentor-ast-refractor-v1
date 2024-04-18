'use server';
import prisma from "@/lib/db";
import {SubjectModel} from "@/type/model";

export async function deleteSubject(id : number) {
    try {
        return await prisma.video.deleteMany({
            where: {
                subjectId: id
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}

export async function addSubject(subject: SubjectModel) {
    try {
        const pathway = await prisma.pathway.findUnique({
            where: {
                id: subject.pathwayId
            }
        });
        if (!pathway) {
            return new Error('Pathway not found');
        }
        return await prisma.subject.create({
            data: {
                name: subject.name,
                pathways: {
                    create: {
                        pathwayId: subject.pathwayId,
                    }
                },
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}