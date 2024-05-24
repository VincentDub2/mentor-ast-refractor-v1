import { v2 as cloudinary } from "cloudinary";
import Logger from "@/lib/logger";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!process.env.CLOUDINARY_API_SECRET) {
        Response.json({ error: "CLOUDINARY_API_SECRET is not set" });
        return Response.error();

    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    Logger.info(`Signature generated: ${signature}`)

    return Response.json({ signature });
}