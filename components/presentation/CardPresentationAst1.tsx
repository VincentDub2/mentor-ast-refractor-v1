import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function CardPresentationAst1() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-rolexEnd font-garamond text-2xl">Votre Prépa En Ligne - Ast 1</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Prix</AccordionTrigger>
                        <AccordionContent>
                            Décrivez ici les tarifs pour Ast 1, par exemple, &quot;Formules à partir de 149€ pour un accès semestriel aux ressources pédagogiques.&quot;
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Programmes proposés</AccordionTrigger>
                        <AccordionContent>
                            Listez les cours ou modules spécifiques à Ast 1, tels que &quot;Fondamentaux en mathématiques, logique, et préparation aux épreuves écrites.&quot;
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Méthodologie</AccordionTrigger>
                        <AccordionContent>
                            Expliquez comment les cours sont structurés pour Ast 1, par exemple, &quot;Sessions en direct pour une interaction maximale, complétées par des exercices pratiques et des évaluations régulières.&quot;
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Avantages</AccordionTrigger>
                        <AccordionContent>
                            Soulignez ce qui distingue votre prépa, comme &quot;Accompagnement individuel, plateforme d&apos;e-learning intuitive, et forums de discussion pour l&apos;entraide entre étudiants.&quot;
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Témoignages</AccordionTrigger>
                        <AccordionContent>
                            Insérez des retours d&apos;expérience d&apos;étudiants ayant suivi la prépa Ast 1, afin de valoriser l&apos;efficacité de votre approche.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>Comment s&apos;inscrire</AccordionTrigger>
                        <AccordionContent>
                            Offrez une explication simple sur les démarches d&apos;inscription, telles que &quot;Remplissez le formulaire en ligne sur notre site ou contactez notre service admissions directement.&quot;
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <Link href="/concours/ast1">
                    <Button type="button" variant="green_ghost" >Voir un exemple</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}