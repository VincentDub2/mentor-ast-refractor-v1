'use client'

import {ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu";
import {startTransition} from "react";
import {delectSectionVideoAction} from "@/actions/sectionVideo";
import {toast} from "@/components/ui/use-toast";
import {GrFormCheckmark, GrFormClose} from "react-icons/gr";
import {DialogTrigger} from "@/components/ui/dialog";

interface ContextMenuSectionActionProps {
    title: string;
    idSection: number;
}

export function ContextMenuSectionAction({title, idSection}: ContextMenuSectionActionProps) {

    const onDelete = () => {
        startTransition(() => {
            delectSectionVideoAction(idSection).then((data) => {
                if (data?.error) {
                    toast({
                        title: "Erreur",
                        description: (
                            <div className="w-[500px] flex flex-col">
                                <div className="flex flex-row">
                                    <GrFormClose className="text-red-600"/>
                                    <p>Erreur lors de la suppréssion</p>
                                </div>
                                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                    <code className="text-white">{JSON.stringify(data.error, null, 2)}</code>
                                </pre>
                            </div>
                        ),
                    })
                }
                if (data?.success) {
                    toast({
                        title: "La section a été supprimé avec succès",
                        description: (
                            <div className="w-[240px] flex flex-row">
                                <GrFormCheckmark className="text-green-700"/> <p>La section a été supprimé avec
                                succès</p>
                            </div>
                        ),
                    })
                }
            });
        });
    }


    return (
        <ContextMenuContent>
            <ContextMenuItem onClick={onDelete}>
                Supprimer la section {title}
            </ContextMenuItem>

            <DialogTrigger asChild>
                <ContextMenuItem>Modifier la section {title}</ContextMenuItem>
            </DialogTrigger>
        </ContextMenuContent>
    );
}