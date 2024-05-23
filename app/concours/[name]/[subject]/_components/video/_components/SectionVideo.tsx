import {Separator} from "@/components/ui/separator";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {VideoComponent} from "@/app/concours/[name]/[subject]/_components/video/_components/VideoComponent";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {
    ContextMenuSectionAction
} from "@/app/concours/[name]/[subject]/_components/video/_components/sectionForm/ContextMenuSectionAction";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {
    DialogUpdateFormSectionVideo
} from "@/app/concours/[name]/[subject]/_components/video/_components/sectionForm/DialogUpdateFormSectionVideo";
import {RoleGate} from "@/components/auth/role-gate";
import {
    DialogFormAddVideo
} from "@/app/concours/[name]/[subject]/_components/video/_components/sectionForm/DialogAddVideoForm";
import {FileComponent} from "@/app/concours/[name]/[subject]/_components/video/_components/FileComponent";
import {getSectionsBySubjectIdAction} from "@/actions/sectionVideo";
import logger from "@/lib/logger";
import {getVideosBySectionIdAction} from "@/actions/video";
import {FaRegFilePdf} from "react-icons/fa";

const file = [
    {title: 'Mathématique', description: 'Cours de mathématique', idSection: 1, position: 1},
    {title: 'Français', description: 'Cours de français', idSection: 2, position: 2},
    {title: 'Anglais', description: 'Cours d\'anglais', idSection: 3, position: 3},
    {title: 'Logique', description: 'Cours de logique', idSection: 4, position: 4},
];

interface SectionVideoProps {
    title : string;
    description: string;
    idSection: number;
    position: number;
};

export  default async function SectionVideo({title,description,idSection,position}: SectionVideoProps) {
    const videoSection = await getVideoSection(idSection);

    return (
        <div>
            <Dialog>
                <ContextMenu>
                <ContextMenuTrigger>
                <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                           {title}
                    </h2>
                    {
                        description && <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">
                            {description}
                            </p>
                            <FaRegFilePdf size={16}/>
                        </div>
                    }
                </div>
                </ContextMenuTrigger>
                    <ContextMenuSectionAction title={title} idSection={idSection}/>
                </ContextMenu>
                <DialogUpdateFormSectionVideo sectionId={idSection} name={title} description={description} position={position}/>
                <Separator className="my-4"/>
                <div className="relative">
                    <ScrollArea>
                        <Dialog>
                            <ContextMenu>
                                <ContextMenuTrigger>
                                    <div className="flex space-x-4 pb-4">
                                        {videoSection && videoSection.length > 0 ? (
                                            videoSection.map((video) => (
                                                <VideoComponent
                                                    key={video.title}
                                                    video={video}
                                                    className="w-[200px]"
                                                    aspectRatio="square"
                                                    width={200}
                                                    height={200}
                                                    seen={true}
                                                />
                                            ))
                                        ) : (
                                            <div>Pas de video disponible pour le moment</div>
                                        )}
                                    </div>
                                    {
                                        /*
                                    <div className="flex space-x-8 pb-4">
                                        {file.map((file) => (
                                            <FileComponent
                                                key={file.title}
                                                file={file}
                                                className="w-[80px]"
                                                aspectRatio="portrait"
                                                width={60}
                                                height={80}
                                                seen={true}
                                            />
                                        ))}
                                    </div>
                                    
                                         */
                                    }
                                </ContextMenuTrigger>
                                <RoleGate allowedRole={"ADMIN"}>
                                    <ContextMenuContent>
                                        <DialogTrigger asChild>
                                            <ContextMenuItem>
                                                Ajouter une video
                                            </ContextMenuItem>
                                        </DialogTrigger>
                                    </ContextMenuContent>
                                </RoleGate>
                                <DialogFormAddVideo sectionId={idSection}/>
                            </ContextMenu>
                        </Dialog>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                </div>
            </Dialog>
        </div>
    )
}


async function getVideoSection(idSection: number){
    const videos = await getVideosBySectionIdAction(idSection);
    if ('error' in videos) {
        return [];
    }
    return videos;

}