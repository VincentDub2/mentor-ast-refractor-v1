'use server';

import * as z from "zod";
import {VideoSchema} from "@/schemas";
import {addVideoWithRevalidate, deleteVideoWithRevalidate, updateVideoWithRevalidate} from "@/data/video";

export const addVideoAction = async (
    values: z.infer<typeof VideoSchema>,
    subjectId: number,
)=>{
    const validatedFields = VideoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        //title: string, youtubeUrl: string, description: string, availableFromDate: Date,sectionId: number
        await addVideoWithRevalidate(validatedFields.data.title,validatedFields.data.youtubeUrl,validatedFields.data.description,validatedFields.data.availableFromDate,subjectId)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }return { error: "Unknown error!" };
    }

    return { success: "Subject added!" };
}

export const updateVideoAction = async (
    values: z.infer<typeof VideoSchema>,
    videoId: number,
)=>{
    const validatedFields = VideoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    try {
        //title: string, youtubeUrl: string, description: string, availableFromDate: Date,sectionId: number
        await updateVideoWithRevalidate(validatedFields.data.title,validatedFields.data.youtubeUrl,validatedFields.data.description,validatedFields.data.availableFromDate,videoId)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }return { error: "Unknown error!" };
    }

    return { success: "Subject added!" };
}

export const deleteVideoAction = async (
    videoId: number,
)=>{
    try {
        //title: string, youtubeUrl: string, description: string, availableFromDate: Date,sectionId: number
        await deleteVideoWithRevalidate(videoId)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }return { error: "Unknown error!" };
    }

    return { success: "Subject added!" };
}