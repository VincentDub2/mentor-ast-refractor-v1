import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function EntrainementLine(props: {
    name: string,
    difficulty: string,
    idEntrainement: number,
    total ?: number,
    score?: number,
    time?: number
}) {
    function convertSecondsToTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    }

    const time = props.time ? convertSecondsToTime(props.time) : null;
    return (
        <TableRow>
            <TableCell>
                <p className="font-medium rounded-full bg-gray-400 hover:bg-gray-700 text-center text-gray-900">{props.difficulty}</p>
            </TableCell>
            <TableCell> {props.name}</TableCell>
            <TableCell>{`${props.score ?? "--"} / ${props.total}`}</TableCell>
            <TableCell>{time ?? "--:--"}</TableCell>
            <TableCell className="text-right">
                <Button variant="green">
                    <Link href={'/training/activity/'+props.idEntrainement}>
                        Lancer
                    </Link>
                </Button>
            </TableCell>
        </TableRow>
    );
}