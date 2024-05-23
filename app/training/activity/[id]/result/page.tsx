import RolexNavbar from "@/components/module/navBarRolex";
import {Footer} from "@/components/module/footer";
import {ResultClientPage} from "@/app/training/activity/[id]/_components/ClientPageResult";
import {ExerciseComplete, ResponseUser} from "@/type/model";
import {auth} from "@/auth";
import {getExerciseByIdAction, getResponseSubmitAction} from "@/actions/exercise";


export default async function Qcm({params}: {params: {id: string}}) {
    const session = await auth();
    const user = session?.user;
    const exerciseData = getExerciseById(params.id) as unknown as ExerciseComplete;
    const responseData = getResponse(params.id, user?.id) as unknown as ResponseUser;

    const [exercise, response] = await Promise.all([exerciseData, responseData])





    if (!user){
        return (
            <div>
                <h1>Vous devez être connecté pour accéder à cette page</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <RolexNavbar/>
            <div className="flex-grow">
                <div className="flex-grow">
                    <ResultClientPage questions={exercise.questions} userAnswers={response.response} note={response.note} temps={response.time}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

async function getExerciseById(id: string){
    const res = await getExerciseByIdAction(parseInt(id));
    if ("error" in res) {
        return null;
    }
    if (!res) {
        return null;
    }
    return res;
}

async function getResponse(exerciseID: string,userId?: string){
    if (!userId){
        return [];

    }
    const res = await getResponseSubmitAction(Number(exerciseID),userId);
    if ('error' in res){
        return [];
    }
    if (!res){
        return [];
    }
    return res;
}