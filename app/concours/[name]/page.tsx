import TextPresentationVert from "@/components/presentation/TextPresentationVert";
import Link from "next/link";
import SubjectContainer from "@/app/concours/[name]/_components/subjectContainer";
import {getSubjectsByPathwayName} from "@/data/subject";
import {auth} from "@/auth";
import {GiBookmarklet} from "react-icons/gi";
import {BiMath} from "react-icons/bi";
import {FaFlagUsa} from "react-icons/fa";
import {TbBulb} from "react-icons/tb";
import ImportantDates from "@/app/concours/[name]/_components/ImportantDate/ImportantDates";
import MotDuJour from "@/app/concours/[name]/_components/CardMotDuJour";
import {getImportantDateFromPath} from "@/data/importanteDate";

export async function generateStaticParams() {
    //const pathways = await getPathways();
    return [{name:'ast1'},{name:'ast2'}];
}

export const dynamicParams = false

export default async function PageConcours({ params }: { params: { name: string }}){
    const subject = await getSubjectsByPathwayName(params.name);
    const session = await auth();
    const user = session?.user;
    const importantDates = await getImportantDates();


    if (!user) {
        return <div className="flex justify-center items-center text-xl">User not found</div>
    }

    if (!subject || subject.length === 0) {
        return <div className="flex justify-center items-center text-xl">Subject not found</div>
    }
    return (
        <div className="container min-h-svh md:p-6">
            <TextPresentationVert Header={`Bienvenue ${user.name} !`}
                                  Text={"Les cours sont disponibles au fur a mesure"}/>

                <div className="w-full mx-8 mb:mx-14 flex flex-row md:space-x-16 ">
                    {/* Section gauche*/}
                    <div className="space-y-6">
                        <h2 className="
                        text-green-800
                font-garamond-bold
                text-2xl
                md:text-3xl
                lg:text-4xl
                mb-4">Bibliothèque des cours</h2>
                        <div className="flex flex-row flex-wrap gap-4 mb-8">
                            <Link href={`/concours/${params.name}/math`}>
                                <SubjectContainer name={"Mathématique"} reactIcon={<BiMath size={64} className="text-blue-900" />}/>
                            </Link>
                            <Link href={`/concours/${params.name}/francais`}>
                                <SubjectContainer name={"Français"} reactIcon={<GiBookmarklet size={64} className="text-purple-800"/>}/>
                            </Link>
                            <Link href={`/concours/${params.name}/anglais`}>
                                <SubjectContainer name={"Anglais"} reactIcon={<FaFlagUsa size={64} className="text-sky-400"/>}/>
                            </Link>
                            <Link href={`/concours/${params.name}/logique`}>
                                <SubjectContainer name={"Logique"} reactIcon={<TbBulb size={64} className="text-orange-300"/>}/>
                            </Link>
                        </div>
                        {/* Important date */}
                        <TextPresentationVert Header={"Les dates"} Text={"Retrouver ici tout les dates importantes"}/>
                             <ImportantDates dates={importantDates}/>

                    </div>
                    {/* Section droite */}
                    <div className="hidden flex-col space-y-4 md:flex">
                        <MotDuJour
                            mot="Éphémère"
                            definition="Qui dure un très court moment."
                        />
                    </div>

                </div>

        </div>
    );
}


async function getImportantDates() {
   return getImportantDateFromPath(1);
}