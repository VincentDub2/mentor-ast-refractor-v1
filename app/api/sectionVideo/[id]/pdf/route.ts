import db from "@/lib/db";
import Logger from "@/lib/logger";
import {revalidateTag} from "next/cache";



export async function PUT(request: Request,context:  {params: {id: string}}) {
    try {
        if (!context.params.id) return new Response("Id manquant", { status: 400 });
        const body = await request.json();

        const { pdf } = body;

        Logger.info(pdf);

       await db.sectionVideo.update({
            where: {
                id: Number(context.params.id)
            },
            data: {
                pdf
            }
        });

       revalidateTag('sectionVideo')


       const res = await db.sectionVideo.findUnique({
            where: {
                id: Number(context.params.id)
            }
        });
        if (!res) {
            return new Response("Impossible de récupérer la section", { status: 500 });
       }

        console.log(res);

        return new Response("Ok", { status: 200 });
    }catch (error) {
        return new Response("Impossible de changer le pdf :" + error, { status: 500 });
    }
}

export async function DELETE(request: Request,context:  {params: {id: string}}) {
    try {
        if (!context.params.id) return new Response("Id manquant", { status: 400 });
        await db.sectionVideo.update({
            where: {
                id: Number(context.params.id)
            },
            data: {
                pdf: null
            }
        });

        revalidateTag('sectionVideo')

        return new Response("Ok", {status: 200});
    } catch (error) {
        return new Response("Impossible de supprimer le pdf :" + error, {status: 500});
    }
}