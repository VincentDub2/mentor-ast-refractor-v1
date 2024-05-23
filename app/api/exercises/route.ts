import db from "@/lib/db";

export async function GET(request: Request) {
    try {
        const exercise = await db.exercise.findMany({
            include: {
                subject: true
            }
        });
        return new Response(JSON.stringify(exercise), { status: 200 });
    }catch (error) {
        return new Response("Impossible de récupérer les exercices", { status: 500 });
    }

}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}