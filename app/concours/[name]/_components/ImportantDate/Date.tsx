'use client';
import React, {startTransition} from "react";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {deleteVideoAction} from "@/actions/video";
import {toast} from "@/components/ui/use-toast";
import {GrFormCheckmark, GrFormClose} from "react-icons/gr";
import {deleteKeyDateAction} from "@/actions/keyDate";
import {DialogUpdateImportantDate} from "@/app/concours/[name]/_components/ImportantDate/DialogUpdateImportantDate";

interface DateProps {
    date: Date;
    content: string;
    idDate: number;
}

export function DateComponent({
                         date,
                         content,
                            idDate
}: DateProps) {
    function formatDateWithDay(date: Date): string {
        // Conversion de la date en objet Date
        date = new Date(date);
        // Tableau des noms de jours de la semaine en français
        const jours = [
            'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
            'Jeudi', 'Vendredi', 'Samedi'
        ];

        // Tableau des noms de mois en français
        const mois = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];

        // Récupération du jour de la semaine, du jour, du mois et de l'année
        const nomJour = jours[date.getDay()];
        const jour = date.getDate();
        const nomMois = mois[date?.getMonth()];
        const annee = date?.getFullYear();

        // Assemblage de la chaîne de caractères finale
        return `${nomJour} ${jour} ${nomMois} ${annee}`;
    }

    const onDelete = () => {
        startTransition(() => {
            deleteKeyDateAction(idDate).then((data) => {
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
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="flex flex-col">
                                                <span className="
                                                    font-garamond-bold
                                                    text-xl
                                                    md:text-2xl
                                                    text-green-800
                                                ">
                                                    {formatDateWithDay(date)}
                                                </span>
                        <span className="
                                                    font-extralight
                                                    text-gray-900
                                                    text-lg
                                                    md:text-xl
                                                ">
                                                    {content}
                                                </span>
                    </div>
                    <ContextMenuContent>
                        <ContextMenuItem onClick={onDelete}>
                            Supprimer
                        </ContextMenuItem>
                        <DialogTrigger asChild>
                            <ContextMenuItem>
                               Update
                            </ContextMenuItem>
                        </DialogTrigger>
                    </ContextMenuContent>
                    </ContextMenuTrigger>
            </ContextMenu>
            <DialogUpdateImportantDate idDate={idDate} date={date} content={content}/>
        </Dialog>
    )
}