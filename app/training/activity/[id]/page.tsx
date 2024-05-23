import {TrainingPage} from "@/app/training/activity/[id]/_components/ClientPageExercise";
import {getExerciseByIdAction} from "@/actions/exercise";


export default async function Activity({params}: {params: {id: string}}) {

    const exercise = await getExerciseById(params.id);

    if (!exercise) {
        return <div>Exercise not found</div>
    }
    return (
        <TrainingPage ExerciseId={exercise.id} ExerciseComplete={exercise}/>
    )

}


async function getExerciseById(id: string){
    const res = await getExerciseByIdAction(parseInt(id));

    if ("error" in res) {
        return null;
    }else if (!res) {
        return null;
    }
    return res;
}