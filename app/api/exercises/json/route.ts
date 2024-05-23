import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { subject,concours,exercise } = body;

        const subjectRecord = await db.subject.findFirst({
            where: {
                name: subject,
                pathways: {
                    some: {
                        pathway: {
                            name: concours,
                        },
                    },
                },
            },
            include: {
                pathways: {
                    include: {
                        pathway: true, // Inclut les détails du Pathway
                    },
                },
            },
        });

        if (!subjectRecord) {
            return new Response("Impossible de trouver le sujet", { status: 400 });
        }

        const exerciseRecord = await db.exercise.create({
            data: {
                title: exercise.title,
                difficulty: exercise.difficulty,
                type: exercise.type,
                subjectId: subjectRecord.id,
                questions: {
                    create: exercise.questions.map((question : any) => ({
                        text: question.text,
                        explanation: question.explanation || '',
                        correctAnswerId: question.correctAnswerId,
                        options: {
                            create: question.options.map((option : any) => ({
                                letter: option.letter,
                                text: option.text,
                            })),
                        },
                    })),
                },
            },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        console.log('body',exerciseRecord);
        return new Response(JSON.stringify(body), { status: 200 });
    } catch (error) {
        return new Response("Impossible de supprimer l'exercice :" + error, {status: 500});
    }
}