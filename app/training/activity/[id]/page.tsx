import {TrainingPage} from "@/app/training/activity/[id]/_components/ClientPageExercise";
import {getExerciseByIdAction} from "@/actions/exercise";
import {getPathwayFromSubjectAction, getSubjectFromExerciseAction} from "@/actions/subject";


export default async function Activity({params}: {params: {id: string}}) {

    const exercise = getExerciseById(params.id);
    const subject =  getSubjectFromExercise(parseInt(params.id));
    const pathway = getPathwayFromSubject(parseInt(params.id));

    const [exerciseData, subjectData,pathData] = await Promise.all([exercise, subject, pathway]);


    if (!exerciseData) {
        return <div>Exercise not found</div>
    }

    if (!subjectData || !pathData) {
        return <div>Subject not found</div>
    }
    return (
        <TrainingPage ExerciseId={exerciseData.id} ExerciseComplete={exerciseData} Subject={subjectData} Pathway={pathData} />
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


async function getSubjectFromExercise(exerciseId: number){
    const res = await getSubjectFromExerciseAction(exerciseId);
    if ("error" in res) {
        return null;
    }else if (!res) {
        return null;
    }
    return res;
}

async function getPathwayFromSubject(subjectId: number){
    const res = await getPathwayFromSubjectAction(subjectId);
    if ("error" in res) {
        return null;
    }else if (!res) {
        return null;
    }
    return res;
}