import SectionVideo from "@/app/concours/[name]/[subject]/_components/video/_components/SectionVideo";
import TextPresentationVert from "@/components/presentation/TextPresentationVert";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {RoleGate} from "@/components/auth/role-gate";
import {
    DialogFormSectionVideo
} from "@/app/concours/[name]/[subject]/_components/video/_components/sectionForm/DialogFormSectionVideo";
import {getSectionsBySubjectIdAction} from "@/actions/sectionVideo";


interface VideosTabParams {
    subjectId: number;
}


export default async function VideosTab({subjectId}: VideosTabParams) {
    const sections = await getSectionsBySubjectId(subjectId);

    return (
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger>
                    <TextPresentationVert Header={"Les vidéos"} Text={"Retrouvez ici les vidéos pour vous aider à mieux comprendre les notions."}/>
                    {
                        sections.map((section, index) => {
                            return <SectionVideo key={index} title={section.name} description={section.description} idSection={section.id} position={section.position} pdf={section.pdf}/>
                        })
                    }

                </ContextMenuTrigger>
                <RoleGate allowedRole={"ADMIN"}>
                    <ContextMenuContent>
                        <DialogTrigger asChild>
                            <ContextMenuItem>
                                Ajouter une section
                            </ContextMenuItem>
                        </DialogTrigger>
                    </ContextMenuContent>
                </RoleGate>
            </ContextMenu>
            <DialogFormSectionVideo subjectId={subjectId}/>
        </Dialog>
    );
}


async function getSectionsBySubjectId(subjectId: number){
    const sections = await getSectionsBySubjectIdAction(subjectId);
    if ('error' in sections) {
        return [];
    }
    return sections;
}