import VideosTab from "@/app/concours/[name]/[subject]/_components/video/video";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import Accueil from "@/app/concours/[name]/[subject]/_components/accueil/Accueil";
import {BreadcrumbSubject} from "@/app/concours/[name]/[subject]/_components/BreadcrumSubject";
import {getSubjectByNameAndNamePathwayAction} from "@/actions/subject";
import {TableListeExo} from "@/components/exercices/TableListeExo";

export async function generateStaticParams() {
    const combiPath = [
        {pathway: 'ast1', subject: 'math'},
        {pathway: 'ast1', subject: 'francais'},
        {pathway: 'ast1', subject: 'anglais'},
        {pathway: 'ast1', subject: 'logique'},
        {pathway: 'ast2', subject: 'math'},
        {pathway: 'ast2', subject: 'francais'},
        {pathway: 'ast2', subject: 'anglais'},
        {pathway: 'ast2', subject: 'logique'},
    ]

    return combiPath.map((path) => ({
        name: path.pathway,
        subject: path.subject
    }))
}
export const dynamicParams = false


export default async function PageSubject({ params }: { params: { name: string, subject: string }})
{
    const subjectObjet = await getSubject(params)
    if (!subjectObjet) {
        return <div className="flex justify-center items-center text-xl">Subject not found</div>
    }


    return (
        <>
            <div className="p-4">
                <BreadcrumbSubject name={params.subject}/>
            </div>
            <Tabs defaultValue={"accueil"} className="w-full p-4">
                <TabsList className="text-xl bg-white transition-all">
                    <TabsTrigger className="hover:text-gray-950" value={"accueil"}>Accueil</TabsTrigger>
                    <TabsTrigger className="hover:text-gray-950" value={"exercices"}>Exercices</TabsTrigger>
                    <TabsTrigger className="hover:text-gray-950" value={"video"}>Cours</TabsTrigger>
                </TabsList>
                <TabsContent value={"accueil"}>
                    <div className="flex flex-col space-y-4">
                        <Accueil sujet={params.subject.toLocaleUpperCase()}/>
                    </div>
                </TabsContent>
                <TabsContent value={"exercices"}>
                    <div className="flex flex-col space-y-4">
                        <TableListeExo subjectId={subjectObjet.id} />
                    </div>
                </TabsContent>
                <TabsContent value={"video"}>
                    <VideosTab subjectId={subjectObjet.id} />
                </TabsContent>
            </Tabs>
        </>
    );
}

async function getSubject(params: { name: string, subject: string }) {
    const subjectFind = await getSubjectByNameAndNamePathwayAction(params.subject, params.name)
    if ('error' in subjectFind) {
        return null
    }
    return subjectFind
}