'use client'

import {startTransition, useEffect, useState} from "react";
import QcmNavBar from "@/app/training/activity/[id]/_components/navBarQcm";
import {Footer} from "@/components/module/footer";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {QuestionContainer} from "@/app/training/activity/[id]/_components/QuestionContainer";
import {useCurrentUser} from "@/hooks/use-current-user";
import {ExerciseComplete, QuestionComplete} from "@/type/model";
import {submitAnswerAction} from "@/actions/exercise";
import {RoleGate} from "@/components/auth/role-gate";
import FormAddQuestion from "@/app/training/activity/[id]/_components/FormAddQuestion";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {useRouter} from 'next/navigation'
import {CldUploadButton, CldUploadWidget} from 'next-cloudinary';
import Logger from "@/lib/logger";

interface Answers {
    [key: number]: string;
}

interface TrainingPageProps {
    ExerciseComplete : ExerciseComplete;
    ExerciseId: number

}


export function TrainingPage(
    params: TrainingPageProps
) {
    const [questions, setQuestions] = useState<QuestionComplete[]>(params.ExerciseComplete.questions);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const user = useCurrentUser();
    const router = useRouter();

    useEffect(() => {

        const id = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
        }, 1000) as unknown as number;

        setIntervalId(id);
        return () => clearInterval(id);
    }, []);

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers(currentAnswers => {
            const updatedAnswers = {
                ...currentAnswers,
                [questionId]: answer
            };

            setProgress(Math.min(Object.keys(updatedAnswers).length * 100 / questions.length, 100));
            return updatedAnswers;
        });
    };


    function calculateNote() {
        let note = 0;
        questions.forEach((question) => {
            if (answers[question.id] === question.correctAnswerId) {
                note += 1;
            }
        });
        return note;
    }



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
        const dataAnswer = {
            exerciseId: params.ExerciseId,
            userId: user?.id as string,
            note: calculateNote(),
            time: timer,
            answers: Object.keys(answers).map((questionId) => {
                return {
                    questionId: parseInt(questionId),
                    response: answers[parseInt(questionId)]
                }
            })
        }
        console.log("dataAnswer", dataAnswer);
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(dataAnswer, null, 2)}</code>
            </pre>
                )})
        startTransition(() => {
            submitAnswerAction(dataAnswer).then((data) => {
                if (data?.error) {
                    console.error(data.error);
                }
                if (data?.success) {
                    console.log(data.success);
                    router.push(`/training/activity/${params.ExerciseId}/result`);
                }

            })
        });
    }


    return (
        <div className="flex flex-col min-h-screen">
            <CldUploadWidget signatureEndpoint="<API Endpoint (ex: /api/sign-cloudinary-params)>">
                {({ open }) => {
                    return (
                        <button onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
            <QcmNavBar progress={progress}/>
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

