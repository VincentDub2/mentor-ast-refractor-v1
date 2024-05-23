import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";


export function  ExerciceCard(
    props: {
        name: string
    }
) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize">{props.name}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}