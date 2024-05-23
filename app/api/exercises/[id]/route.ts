import db from "@/lib/db";

export async function GET(request: Request,context:  {params: {id: string}}) {
    try {
        if (!context.params.id) return new Response("Id manquant", { status: 400 });
        const exercise = await db.exercise.findMany({
            where: {
                id: Number(context.params.id)
            },
            include: {
                questions:{
                    include:{
                        options: true
                    }
                }
        }});
        return new Response(JSON.stringify(exercise), { status: 200 });
    }catch (error) {
        return new Response("Impossible de récupérer les exercices :"+error, { status: 500 });
    }
}

export async function DELETE(request: Request,context:  {params: {id: string}}) {
    try {
        if (!context.params.id) return
        const exercise = await db.exercise.delete({
            where: {
                id: Number(context.params.id)
            }
        });
        return new Response(JSON.stringify(exercise), {status: 200});
    } catch (error) {
        return new Response("Impossible de supprimer l'exercice :" + error, {status: 500});
    }
}