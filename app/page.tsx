import {Footer} from "@/components/module/footer";
import Contact from "@/components/Contact";
import ContactDetails from "@/components/ContactDetails";
import RolexNavbar from "@/components/module/navBarRolex";
import TextPresentationVert from "@/components/presentation/TextPresentationVert";
import {FaChevronRight} from "react-icons/fa6";
import PrepaPresentation2 from "@/components/presentation/PrepaPresentation";
import CardPresentationAst2 from "@/components/presentation/CardPresentationAst2";
import CardPresentationAst1 from "@/components/presentation/CardPresentationAst1";

export default function Home() {
    const textPresentation = 'Mentor, votre prépa spécialisée dans la préparation aux concours d\'écoles de commerce via les Admissions sur Titre (AST), offre un accompagnement sur mesure réalisé par des étudiants pour des étudiants.Mentor propose une gamme variée de formations adaptées à chaque profil, des préparations intensives aux parcours personnalisés, afin de répondre au mieux aux attentes et objectifs de chacun. Notre mission est de vous préparer efficacement aux concours des grandes écoles de commerce, en mettant à votre disposition l\'expertise et l\'expérience de ceux qui ont réussi, pour garantir votre succès.'
    const footPresentation = (<>
        <p>Trouvez votre préparation</p>
        <FaChevronRight/>
    </>)
    // Ajoutez d'autres sections selon vos besoins
    return (
        <div className="h-full bg-white">
            <RolexNavbar/>
            <main className="pb-20">
                <div
                    className="text-rolexEnd min-h-[350px] md:min-h-[450px] lg:min-h-[550px] xxl:min-h-[650px] bg-[url('../public/student6.jpg')] bg-bottom-4 bg-cover flex flex-col justify-center items-center">
                    <p className="
                        font-thin
                        uppercase
                        text-lg
                        md:text-4xl
                        text-neutral-100
                     ">Notre préparation</p>
                    <p className="font-sans font-bold
                        md:text-7xl
                        text-4xl
                        ">Ecole de Commerce</p>
                </div>
                <TextPresentationVert Header="Explorer nos preparations" Text={textPresentation} Foot={footPresentation}/>
                <div className="
                grid
                lg:grid-cols-2
                items-stretch
                p-4
                gap-8
                sm:grid-cols-1
                min-h-[550px]
                mx-10
                ">
                    <CardPresentationAst1/>
                    <CardPresentationAst2/>
                </div>
                <PrepaPresentation2/>
                <section id="contact"
                         className="md:pt-20 pt-10 grid xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 p-2 bg-white w-full gap-8 items-stretch">
                    <ContactDetails/>
                    <Contact/>
                </section>
            </main>
            <Footer/>
        </div>
    );
}
