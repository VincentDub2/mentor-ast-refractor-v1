import {NextResponse,NextRequest} from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);

import { v2 as cloudinary } from 'cloudinary';
import logger from "@/lib/logger";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(req: { formData: () => any; }, res: any) {
    try{
        const formData = await req.formData();

        logger.info(formData)

        const file  = formData.getAll('files')[0]

        logger.info(file)

        const buffer = await file.arrayBuffer();
        const byteArrayBuffer = Buffer.from(buffer);

        let result = await new Promise((resolve) => {
            cloudinary.uploader.upload_stream((error, uploadResult) => {
                return resolve(uploadResult);
            }).end(byteArrayBuffer);
        }).then((uploadResult) => {
            // @ts-ignore
            console.log(`Buffer upload_stream wth promise success - ${uploadResult.public_id}`);
            return uploadResult;
        });

        return NextResponse.json({status:"success",data:result})
    }
    catch (e : any) {
        logger.error(e)
        return  NextResponse.json({status:"fail",data:e})
    }
}
