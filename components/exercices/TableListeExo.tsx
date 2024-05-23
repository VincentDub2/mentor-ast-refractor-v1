import {auth} from "@/auth";
import {DataTable} from "@/components/exercices/tableExercises/components/data-table";
import {columns} from "@/components/exercices/tableExercises/components/columns";
import {z} from "zod";
import {exercisesSchema} from "@/components/exercices/tableExercises/data/schema";
import TextPresentationVert from "@/components/presentation/TextPresentationVert";
import {getExercisesBySubjectIdAction} from "@/actions/exercise";


interface TableListeExoProps {
    subjectId: number;
}
export async function TableListeExo( {subjectId} : TableListeExoProps) {
    const session = await auth();
    const user = session?.user;
    const exercises = await getExercises(subjectId, user?.id ?? "");
  return (
      <div className="mx-4">
          <TextPresentationVert Header={"Les exercices"} Text={"Retrouvez ici les exercices pour vous aider à mieux comprendre les notions."}/>
          <DataTable data={exercises} columns={columns} />
      </div>
  )
}

async function getExercises(subjectId : number, userId : string  ) {
    const exercises = await getExercisesBySubjectIdAction(subjectId, userId)

    if ('error' in exercises) {
        return [];
    }

    const goodExercises = exercises?.map((exercise) => {
        return {
            id: exercise.id,
            title: exercise.title,
            difficulty: exercise.difficulty,
            theme: exercise.type,
            lastScore: exercise.ExerciseDone[0]?.note ?? 0,
            nbQuestions: exercise._count?.questions ?? 0,
        }})
    return z.array(exercisesSchema).parse(goodExercises)

}

