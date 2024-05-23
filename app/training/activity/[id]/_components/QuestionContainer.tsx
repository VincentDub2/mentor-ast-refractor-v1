'use client'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"


import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import React, {startTransition, useEffect, useState} from "react";
import {Option} from "@prisma/client";
import {RoleGate} from "@/components/auth/role-gate";
import {Button} from "@/components/ui/button";
import {deleteQuestionAction} from "@/actions/question";
import {toast} from "@/components/ui/use-toast";

export function QuestionContainer(props: {
    numero: number,
    question: string,
    options: Option[]
    correctAnswerId: string,
    questionId: number,
    explication: string,
    onAnswer: (questionId : number, answer : string) => void,
                                      modeCorrection: boolean,
    userAnswers?: string
}
) {
    const [showAnswer, setAnswers] = useState<boolean>(props.modeCorrection);
    const [answer, setAnswer] = useState<string>("");
    const [openItem, setOpenItem] = useState('');

    useEffect(() => {
        if (props.modeCorrection) {
            setOpenItem('item-1'); // Assurez-vous que cette valeur correspond à la prop `value` de l'`AccordionItem` que vous voulez ouvrir
            setAnswer(props.userAnswers || "")
        } else {
            setOpenItem(''); // Aucun item n'est ouvert
        }
    }, [props.modeCorrection, props.userAnswers]);
    const handleChange = (value : string) => {
        console.log("Question",props.question,"value", value)
        setAnswer(value)
        props.onAnswer(props.questionId,value)
    }

    const handleOnDelete = () => {
        startTransition(() => {
            deleteQuestionAction(props.questionId).then((data) => {
                toast({
                    title: "You submitted the following values:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <p>Is delete</p>
                        </pre>

                    ),
                })
            })
        });
    }

    function isCorrectAnswer() {
        {/* Trouver l'option correspondant à la réponse correcte */}
        const correctOption = props.options.find(option => option.letter === props.correctAnswerId);
        {/* Vérifier si la réponse choisie par l'utilisateur est la réponse correcte */}
        return  answer === correctOption?.letter;
    }

    const showCorrection = () => {
        console.log("Question",props.question,"correctAnswerId", props.correctAnswerId)
        setAnswers(!showAnswer)
    }
  return (
      <Card className="mx-2 md:mx-40">
          <CardHeader>
              <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-gray-900">Question {props.numero}</CardTitle>
                  <RoleGate allowedRole={"ADMIN"}>
                        <Button onClick={handleOnDelete} variant="ghost" className="text-red-500">Supprimer</Button>
                  </RoleGate>
              </div>
              <CardDescription className="font-light text-lg text-gray-900" >{props.question}</CardDescription>
          </CardHeader>
          <CardContent className="pl-14">
              <RadioGroup defaultValue={props.userAnswers} onValueChange={handleChange} disabled={props.modeCorrection}>
                  {props.options.map((reponse, index) => {
                      const isCorrectAnswer = reponse.letter === props.correctAnswerId;
                      const isUserAnswer = reponse.text === answer;
                      let labelClasses = "flex font-light text-gray-900 text-lg mt-2 items-center space-x-2";
                      if (showAnswer) {
                          labelClasses += isCorrectAnswer ? " text-green-500" : isUserAnswer ? " text-red-500" : "";
                      }
                      return (
                          <div key={index} className={labelClasses}>
                                <RadioGroupItem value={reponse.letter} id={reponse.letter}/>

                          <Label htmlFor={reponse.letter}>{reponse.text}</Label>
                          </div>
                      )
                  })}
              </RadioGroup>
          </CardContent>
          <CardFooter className="flex flex-col">
              <Accordion value={openItem} onValueChange={setOpenItem} className="w-full" type="single" collapsible>
                  <AccordionItem value="item-1">
                      <AccordionTrigger disabled={props.modeCorrection}   className="flex justify-end p-4" onClick={showCorrection}>Voir la correction ? </AccordionTrigger>
                      <AccordionContent>
                          <div>
                              {isCorrectAnswer() ? (
                                    <p className="text-green-500">Bonne réponse</p>

                              ): (
                                    <p className="text-red-500">Mauvaise réponse</p>
                              )}
                              <p>Réponse correcte: {props.options.find(option => option.letter === props.correctAnswerId)?.text}</p>
                              <p>Vous avez choisie la reponse : {answer}</p>
                              <p>Explication: {props.explication}</p>

                          </div>
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardFooter>
      </Card>
  );
}