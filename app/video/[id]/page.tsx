import {VideoPlayer} from "@/app/video/[id]/_components/VideoPlayer";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {FcApproval} from "react-icons/fc";
import {BsCheck2Circle} from "react-icons/bs";
import {BreadcrumbVideo} from "@/app/video/[id]/_components/BreadcrumbVideo";



export default async function PageVideo({params}: {params: {id: string}}) {

    const video = await getVideo(params.id);

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-full p-6">
                <BreadcrumbVideo title={video.title}/>
            </div>
            <div className="w-full md:w-2/3 h-screen p-6 space-y-4">
                {/*Section du titre*/}
                <div className="items-start justify-start">
                    <h1 className="text-3xl font-bold text-gray-950">{video.title}</h1>
                </div>
                {/*Lecteur video*/}
                <Suspense fallback={<Skeleton/>}>
                    <VideoPlayer videoId={params.id}/>
                </Suspense>
                <div>
                    <h2 className="text-2xl font-bold text-gray-950">Description</h2>
                    <p className="text-gray-900">{video.description}</p>
                    {/*Section pour proposer de télécharger la fiche lié*/}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <FcApproval className="text-green-800"/>
                            <p className="text-green-800">Fiche disponible</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <BsCheck2Circle className="text-green-800"/>
                            <p className="text-green-800">Cours vu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


async function getVideo(id: string) {
    return {
        title: 'Mathématique',
        description: 'Cours de mathématique'
    }
}