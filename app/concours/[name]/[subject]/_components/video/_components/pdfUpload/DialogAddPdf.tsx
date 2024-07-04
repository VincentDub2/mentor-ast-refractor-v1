import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {MdNoteAdd} from "react-icons/md";
import FileUpload from "@/components/FileUpload";



const DialogAddPdf = (
    {sectionId}: {sectionId: number}
) => {
    return (
            <Dialog>
                <DialogTrigger asChild>
                    <MdNoteAdd/>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un pdf</DialogTitle>
                        <DialogDescription>
                            Ajouter un pdf pour cette section
                        </DialogDescription>
                    </DialogHeader>
                   <FileUpload sectionId={`${sectionId}`}
                   />
                </DialogContent>
            </Dialog>
    );
}

export default DialogAddPdf;
