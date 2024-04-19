// Sous-composant pour afficher des conseils
import TextPresentationVert from "@/components/presentation/TextPresentationVert";

interface AccueilProps {
    sujet: string;
}
export default function Accueil (props: AccueilProps){

    const introduction = `Bienvenue dans la section ${props.sujet}! Ici, vous trouverez tout ce dont vous avez besoin pour exceller et transformer vos connaissances en succès pour le concours.`;
    const conseils = [
        { conseil: `Organisez votre temps d'étude en blocs focalisés de 45 minutes avec des pauses de 15 minutes.` },
        { conseil: `Utilisez des ressources supplémentaires pour approfondir les concepts difficiles.` },
        { conseil: `Pratiquez régulièrement avec des exercices et des anciens examens.` },
    ];
    const conseilsFormatted = conseils.map((conseil, index) => <li key={index}>{conseil.conseil}</li>);

    return (
        <div className="grid items-stretch pt-20 gap-4 pb-28 md:grid-cols-2 grid-cols-1 space-y-2">
            <h2 className="text-green-800 font-garamond-bold text-3xl md:text:4xl lg:text-5xl pl-8 ml-3 md:pl-28">
                Introduction au {props.sujet}
            </h2>
            <div className="space-y-20 pl-24 md:pl-4">
                <div className="font-extralight text-gray-900 text-lg md:text-xl text-wrap pr-8 md:pr-18">
                    <p>{introduction}</p>
                    <ul className="list-disc pl-5">
                        {conseilsFormatted}
                    </ul>
                </div>
                {/* Exemple d'ajout d'un pied de page, si vous avez des informations ou des actions spécifiques à inclure */}
                {/* <div className="flex items-center font-bold gap-1 text-green-800 hover:text-gray-950">
                    Pied de page optionnel ici
                </div> */}
            </div>
        </div>
    );
}