'use client'
import ReactPlayer from "react-player/youtube";

export function VideoPlayer({ videoId  }: { videoId: string}) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div className="relative pt-[56.25%]">
            <ReactPlayer
                url={embedUrl}
                controls={true}
                width='100%'
                height='100%'
                className="rounded-xl overflow-hidden absolute top-0 left-0"
            />
        </div>
    );
}