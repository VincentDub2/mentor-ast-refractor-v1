import TextPresentationVert from "@/components/presentation/TextPresentationVert";

const PrepPresentation2 = () => {
    const body = (
    <p className="mb-6">
        Notre prépa, conçue par des étudiants pour des étudiants, est un véritable atout.
        <br/>
        Nous vous proposons un programme complet pour exceller au Tage Mage, avec des cours, des tests pratiques, et un
        suivi personnalisé.
    </p>
)
    return (
        <TextPresentationVert Header={" Mentor - Excellence et Proximité"} Text={body}/>
    );
};

export default PrepPresentation2;
