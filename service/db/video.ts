import {revalidateTag, unstable_cache} from "next/cache";
import {Video} from "@prisma/client";
import db from "@/lib/db";
import {VideoModel} from "@/type/model";

const VideoService = {
    get_videos : unstable_cache(
        async () => {
            return db.video.findMany({});
        },
        ['videos'],
        {
            tags: ['videos'],
        }
    ),

    get_video_by_subject : unstable_cache(
        async (subjectId: number) => {
            try {
                return await db.video.findMany({
                    where: {
                        subjectId: subjectId
                    }
                });}catch (e) {
                console.error(e);
            }
        },
        ['videos'],
        {
            tags: ['videos'],
        }
    ),
    postData : async (video : VideoModel) => {
        try {
            return await db.video.create({
                data: video,
            });
        }catch (e) {
            console.error(e);
        }finally {
            revalidateTag('videos');
        }
    },

     deleteVideo: async (id : number)=> {
        try {
            return await db.video.delete({
                where: {
                    id: id
                }
            });
        }catch (e) {
            console.error(e);
        }finally {
            revalidateTag('videos');
        }
    },

    /**
     * Get all video from a section using the unstable_cache function from next14
     * @param sectionId
     * @returns {Promise<Video[] | undefined>}
     */

    get_videos_by_section_with_cache : unstable_cache(
        async (sectionId: number) => {
            try {
                return await db.video.findMany({
                    where: {
                        sectionId: sectionId
                    }
                });
            }catch (e) {
                console.error(e);
            }
        },
        ['videos'],
        {
            tags: ['videos'],
        }
    ),

    /**
     * Add a video to the database using the unstable_cache function from next14
     * @param title
     * @param youtubeUrl
     * @param description
     * @param availableFromDate
     * @param sectionId
     * @returns {Promise<Video | undefined>}
     */

    addVideoWithRevalidate : async (title: string, youtubeUrl: string, description: string, availableFromDate: Date,sectionId: number): Promise<Video | undefined> => {
        try {
            return await db.video.create({
                data: {
                    title: title,
                    youtubeUrl: youtubeUrl,
                    description: description,
                    availableFromDate: availableFromDate,
                    sectionId: sectionId,
                }
            });
        }catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('videos');
        }
    },

    /**
     * Update a video in the database using the unstable_cache function from next14
     * @param title
     * @param youtubeUrl
     * @param description
     * @param availableFromDate
     * @param videoId
     * @returns {Promise<Video | undefined>}
     */
    updateVideoWithRevalidate : async (title: string, youtubeUrl: string, description: string, availableFromDate: Date,videoId: number) => {
        try {
            return await db.video.update({
                where: {
                    id: videoId
                },
                data: {
                    title: title,
                    youtubeUrl: youtubeUrl,
                    description: description,
                    availableFromDate: availableFromDate,
                }
            });
        }catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('videos');
        }
    },

    /**
     * Delete a video in the database using the unstable_cache function from next14
     * @param videoId
     * @returns {Promise<Video | undefined>}
     */
    deleteVideoWithRevalidate : async (videoId: number) : Promise<Video | undefined> => {
        try {
            return await db.video.delete({
                where: {
                    id: videoId
                }
            });
        }catch (error) {
            if (error instanceof Error) {
                console.log("error", error);
                throw new Error(error.message);
            }else throw new Error("Unknown error!");
        }finally {
            revalidateTag('videos');
        }
    }
}

export default VideoService;

