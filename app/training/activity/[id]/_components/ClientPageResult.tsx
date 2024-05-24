'use client'
import {QuestionContainer} from "@/app/training/activity/[id]/_components/QuestionContainer";
import {QuestionComplete} from "@/type/model";
import {ResponseSubmit} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


interface ResultClientPageProps {
    questions: QuestionComplete[],
    userAnswers : ResponseSubmit[],
    note: number,
    temps: number
}
export function ResultClientPage(params: ResultClientPageProps) {
    const router = useRouter()
    const handleBack = () => {
        window.history.go(-2)
    }
    return (
                    <div className="flex flex-col justify-center items-stretch gap-4 m-4">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-4xl font-bold">Résultats</h1>
                            <div className="flex justify-between items-center gap-4 m-2">

                                <Button variant="green" onClick={handleBack}>Retour au exercise</Button>
                                <h2 className="text-2xl font-bold">Score : {params.note}/{params.questions.length}</h2>
                                <h2 className="text-2xl font-bold">Temps : {params.temps}s</h2>
                            </div>
                        </div>
                        {
                            params.questions.map((question, index) => {
                                return (
                                    <QuestionContainer key={index} numero={index + 1} question={question.text}
                                                       options={question.options as any}
                                                       onAnswer={()=>{}}
                                                       correctAnswerId={question.correctAnswerId}
                                                       modeCorrection={true}
                                                       image={question.ImageUrl}
                                                       userAnswers={params.userAnswers.find((userAnswer) => userAnswer.questionId === question.id)?.response}
                                                       questionId={question.id}
                                                       explication={question.explanation ?? ""}
                                    />
                                )
                            })
                        }
                    </div>
    )
}