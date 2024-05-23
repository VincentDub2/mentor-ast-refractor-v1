'use server';

import * as z from "zod";
import {VideoSchema} from "@/schemas";
import VideoService from "@/service/db/video";
import logger from "@/lib/logger";
import {Video} from "@prisma/client";

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
        await VideoService.addVideoWithRevalidate(validatedFields.data.title,validatedFields.data.youtubeUrl,validatedFields.data.description,validatedFields.data.availableFromDate,subjectId)
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
        await VideoService.updateVideoWithRevalidate(validatedFields.data.title,validatedFields.data.youtubeUrl,validatedFields.data.description,validatedFields.data.availableFromDate,videoId)
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
        await VideoService.deleteVideoWithRevalidate(videoId)
    } catch (error) {
        if (error instanceof Error) {
            return { error:error.message };
        }return { error: "Unknown error!" };
    }

    return { success: "Subject added!" };
}

/**
 * Get videos by sectionId with cache
 * @param sectionId
 * @returns {Promise<Video[] | {error: string}>}
 */
export const getVideosBySectionIdAction = async (sectionId: number): Promise<Video[] | {error: string}> => {
    try {
        logger.info(`Get videos with sectionId ${sectionId}`)
        return await VideoService.get_videos_by_section_with_cache(sectionId) ?? {error: "No videos found!"};
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to get videos with sectionId ${sectionId}`)
            return { error:error.message };
        }
        logger.error(`Failed to get videos with sectionId ${sectionId}`)
        return { error: "Unknown error!" };
    }
}