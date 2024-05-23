import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog"
import AddExerciceForm from "@/components/exercices/addExcerciceForm";

interface DialogExerciceFormProps {
    subjetId: number;

}

export function DialogExerciceForm( {subjetId} : DialogExerciceFormProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <p className="inline-flex items-center px-2.5 py-0.5 text-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-green-800 hover:bg-accent hover:text-accent-foreground">Add Exercice</p>
            </DialogTrigger>
            <DialogContent>
                <AddExerciceForm subjectId={subjetId}/>
            </DialogContent>
        </Dialog>
    );
}