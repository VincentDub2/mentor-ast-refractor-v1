'use client'

import {useEffect, useState} from "react";
import QcmNavBar from "@/app/training/activity/[id]/_components/navBarQcm";
import {Footer} from "@/components/module/footer";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {QuestionContainer} from "@/app/training/activity/[id]/_components/QuestionContainer";
import {useCurrentUser} from "@/hooks/use-current-user";
import {QuestionComplete} from "@/type/model";
import {RoleGate} from "@/components/auth/role-gate";
import FormAddQuestion from "@/app/training/activity/[id]/_components/FormAddQuestion";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {BiMath} from "react-icons/bi";

/*
This component isn't used anymore, it has been replaced by the component in the same folder
 */

interface Answers {
    [key: number]: string;
}

interface TrainingPageProps {
    questions: QuestionComplete[],
    ExerciseId: number

}


export function TrainingPage(
    params: TrainingPageProps
) {
    const [questions, setQuestions] = useState<QuestionComplete[]>(params.questions);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const user = useCurrentUser();



    useEffect(() => {

        const id = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
        }, 1000) as unknown as number;

        setIntervalId(id);
        return () => clearInterval(id);
    }, []);



    const handleAnswer = (questionId : number, answer : string) => {
        setAnswers(currentAnswers => ({
            ...currentAnswers,
            [questionId]: answer
        }));
        // Mise à jour de la progression ici, si nécessaire
        setProgress((currentProgress) => {
            return  Math.min(currentProgress + (100 / questions.length), 100);
        });

    };


    function onSubmit() {
        if (intervalId !== null) clearInterval(intervalId);
        console.log(JSON.stringify(answers, null, 2));
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(answers, null, 2)}</code>
        </pre>
            ),
        })
    }



    return (
        <div className="flex flex-col min-h-screen">
            <QcmNavBar progress={progress} iconSubj={BiMath} nameSubj={"math"} pathName={"ast1"}/>
            <div className="flex-grow">
                <div className="flex flex-col justify-center items-stretch gap-4 m-4">
                    {
                        questions.map((question, index) => {
                            return (
                                <QuestionContainer key={index} numero={index + 1} question={question.text}
                                                   options={question.options as any}
                                                   onAnswer={handleAnswer}
                                                   correctAnswerId={question.correctAnswerId}
                                                   modeCorrection={false}
                                                    image={question.ImageUrl}
                                                   questionId={question.id}
                                                   explication={question.explanation ?? ""}
                                />
                            )
                        })
                    }
                    <RoleGate allowedRole="ADMIN">
                        <div className="flex justify-center items-center mb-5">
                            <Dialog>
                                <DialogTrigger>Add a question</DialogTrigger>
                                <DialogContent>
                                    <FormAddQuestion ExerciseId={params.ExerciseId} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </RoleGate>
                </div>
                <div className="flex justify-center items-center mb-5">
                    <Button variant="green_ghost" onClick={onSubmit} type="submit">Soumettre les résultats</Button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

