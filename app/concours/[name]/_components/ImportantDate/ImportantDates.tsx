import React from 'react';
import {Card, CardContent,} from "@/components/ui/card";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {DialogAddImportantDate} from "@/app/concours/[name]/_components/ImportantDate/DialogAddImportantDate";
import {KeyDate} from "@prisma/client";
import {DateComponent} from "@/app/concours/[name]/_components/ImportantDate/Date";


interface ImportantDatesProps {
    dates: KeyDate[];
}

const ImportantDates: React.FC<ImportantDatesProps> = ({ dates }) => {


    return (
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-3/4 md:w-full">
                        <div className="space-y-4 p-4">
                            {dates.map((dateItem, index) => (
                                <DateComponent key={index} idDate={dateItem.id} date={dateItem.date} content={dateItem.content}/>
                            ))}
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                <DialogTrigger asChild>
                    <ContextMenuItem>
                        Ajouter une date
                    </ContextMenuItem>
                </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>
            {/* Add important date
            Problem: path devra etre chercher dans le contexte
            */}
            <DialogAddImportantDate pathId={1}/>
        </Dialog>
    );
};

export default ImportantDates;
