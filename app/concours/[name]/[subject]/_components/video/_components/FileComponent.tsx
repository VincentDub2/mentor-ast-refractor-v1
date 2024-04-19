'use client'
import Image from "next/image"

import {cn} from "@/lib/utils"
import {ContextMenu, ContextMenuTrigger,} from "@/components/ui/context-menu"
import {Video} from "@prisma/client";
import {RoleGate} from "@/components/auth/role-gate";
import Link from "next/link";
import {Dialog} from "@/components/ui/dialog";
import {
    ContextMenuVideoAction
} from "@/app/concours/[name]/[subject]/_components/video/_components/sectionForm/ContextMenuVideoAction";
import {
    DialogUpdateFormVideo
} from "@/app/concours/[name]/[subject]/_components/video/_components/sectionForm/DialogUpdateFormVideo";
import { HTMLAttributes } from "react";


interface File {
    title: string;
    description: string;
    idSection: number;
    position: number;
}
interface AlbumArtworkProps extends HTMLAttributes<HTMLDivElement> {
    file: File;
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
    seen?: boolean
}



export function FileComponent({
                                   file,
                                   aspectRatio = "portrait",
                                   width,
                                   height,
                                   seen,
                                   className,
                                   ...props
                               }: AlbumArtworkProps) {


    return (
        <Dialog>
            <div className={cn("space-y-3 relative", className)} {...props}>
                <ContextMenu>
                    <ContextMenuTrigger>
                        <div className="overflow-hidden rounded-md">
                            <Link href={"/video/"}>
                                <Image
                                    src={"/pdf.svg"}
                                    alt={file.title}
                                    width={width}
                                    height={height}
                                    className={cn(
                                        "h-auto w-auto object-cover transition-all hover:scale-105",
                                        aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                                    )}
                                />
                            </Link>
                        </div>
                    </ContextMenuTrigger>
                    <RoleGate allowedRole={"ADMIN"}>
                        <ContextMenuVideoAction title={""} idVideo={2}/>
                    </RoleGate>
                </ContextMenu>
                {/* Update video}
                <DialogUpdateFormVideo
                    videoId={video.id}
                    title={video.title}
                    description={video.description ?? ''}
                    youtubeUrl={video.youtubeUrl}
                    availableFromDate={video.availableFromDate}
                />
                */}

                <div className="space-y-1 text-sm">
                    <h3 className="font-medium leading-none">{file.title}</h3>
                    <p className="text-xs text-muted-foreground">{file.description}</p>
                </div>
                {/*seen ? (
            <div className="absolute top-0 right-0">
              <BsCheck2Circle  className="text-green-700" size={35}/>
            </div>
        ) : null}
          */}
            </div>
        </Dialog>
    )
}