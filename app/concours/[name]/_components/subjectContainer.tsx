import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"

interface SubjectContainerProps {
    name: string;
    className?: string;
    reactIcon: React.ReactNode;
}


function SubjectContainer(props: SubjectContainerProps){
    return (
        <Card className="h-[12em] w-[12em] hover:scale-105 shadow-card hover:shadow-xl bg-gradient-to-br bg-gray-100 bg-opacity-40">
            <CardHeader>
                <CardTitle className="font-garamond-bold text-grey-900 text-2xl text-center">{props.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                {props.reactIcon}
            </CardContent>
        </Card>
    );
}

export default SubjectContainer;