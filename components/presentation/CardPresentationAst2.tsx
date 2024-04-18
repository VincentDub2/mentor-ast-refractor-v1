import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Button} from "@/components/ui/button";


export default function CardPresentationAst2() {
  return (
      <div className="relative">
        <Card>
          <CardHeader>
            <CardTitle className="text-rolexEnd font-garamond text-2xl">Votre Prépa En Ligne - Ast 2</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Prix</AccordionTrigger>
                <AccordionContent>
                  Détaillez ici vos offres et les prix associés, par exemple, &quot;Accès complet à tous les cours pour
                  199€/an&quot;.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Programmes proposés</AccordionTrigger>
                <AccordionContent>
                  Expliquez les différents programmes que vous proposez, par exemple, &quot;Cours de mathématiques,
                  physique, chimie et informatique pour les préparations aux concours d&apos;ingénieur&quot;.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Méthodologie</AccordionTrigger>
                <AccordionContent>
                  Présentez votre méthode d&apos;enseignement, par exemple, &quot;Approche personnalisée avec des
                  exercices adaptés au niveau de chaque étudiant&quot;.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Avantages</AccordionTrigger>
                <AccordionContent>
                  Mettez en avant les avantages de votre préparation, comme &quot;Suivi personnalisé, flexibilité des
                  horaires, accès à une plateforme d&apos;apprentissage en ligne 24/7&quot;.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Témoignages</AccordionTrigger>
                <AccordionContent>
                  Partagez quelques témoignages d&apos;anciens élèves, ce qui peut aider à rassurer les potentiels
                  intéressés.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Comment s&apos;inscrire</AccordionTrigger>
                <AccordionContent>
                  Fournissez des informations claires sur la manière de s&apos;inscrire à votre prépa, par
                  exemple, &quot;Contactez-nous via le formulaire sur notre site web ou par téléphone au 01 23 45 67
                  89&quot;.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Link href="/concours/ast2">
              <Button type="button" variant="green_ghost">Voir un exemple</Button>
            </Link>
          </CardFooter>
        </Card>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded bg-opacity-40 flex justify-center items-center z-0">
          <span className="text-white font-bold text-4xl">Prochainement</span>
        </div>
      </div>
  );
}