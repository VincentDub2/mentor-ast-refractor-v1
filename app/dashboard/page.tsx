import {Metadata} from "next"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {CalendarDateRangePicker} from "@/app/dashboard/_components/date-range-picker"
import {Overview} from "@/app/dashboard/_components/overview"
import {RecentSales} from "@/app/dashboard/_components/recent-sales"
import {auth} from "@/auth";
import {getExercisesDoneByUserIdAction} from "@/actions/exercise";
import {ExerciseDone} from "@prisma/client";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default async function DashboardPage() {
    const session = await auth();
    const user = session?.user;
    const exercises = await exerciseDone(user?.id) ?? [];
    const numbersExerciseDone = exercises?.length ?? 0;
    const timeSpent = exercises?.reduce((acc, current) => acc + current.time, 0) ?? 0;
    const timeSpentAverage = timeSpent / numbersExerciseDone ?? 0;
    function getAverage(arr: number[]) {
        return arr.reduce((acc, current) => acc + current, 0) / arr.length;
    }
    const averageNote = getAverage(exercises?.map((e) => e.note) ?? []);

    // Function to get exercises data for a given week
    function filterExercisesByWeek(exercises: ExerciseDone[], startOfWeek? : Date, endOfWeek? : Date) {
        if (!exercises || !startOfWeek || !endOfWeek) {
            return [];
        }
        return exercises.filter(e   => {
            const exerciseDate = new Date(e.Date);
            return exerciseDate >= startOfWeek && exerciseDate < endOfWeek;
        });
    }
    // Calculate metrics for the current and previous weeks
    const now = new Date();
    const startOfCurrentWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const startOfLastWeek = new Date(startOfCurrentWeek.getFullYear(), startOfCurrentWeek.getMonth(), startOfCurrentWeek.getDate() - 7);
    const startOfTwoWeeksAgo = new Date(startOfLastWeek.getFullYear(), startOfLastWeek.getMonth(), startOfLastWeek.getDate() - 7);

    const currentWeekExercises = filterExercisesByWeek(exercises, startOfCurrentWeek, now);
    const lastWeekExercises = filterExercisesByWeek(exercises, startOfLastWeek, startOfCurrentWeek);

    // Calculating total time
    const currentTimeSpent = currentWeekExercises.reduce((acc, curr) => acc + curr.time, 0);
    const lastTimeSpent = lastWeekExercises.reduce((acc, curr) => acc + curr.time, 0);
    const percentageChangeTimeSpent = ((currentTimeSpent - lastTimeSpent) / (lastTimeSpent || 1)) * 100;
    const percentageChangeTimeSpentFormatted = formatPercentageChange(percentageChangeTimeSpent);

    // Calculating average time
    const currentAverageTime = getAverage(currentWeekExercises.map(e => e.time));
    const lastAverageTime = getAverage(lastWeekExercises.map(e => e.time));
    const percentageChangeAverageTime = ((currentAverageTime - lastAverageTime) / (lastAverageTime || 1)) * 100;
    const percentageChangeAverageTimeFormatted = formatPercentageChange(percentageChangeAverageTime);

    // Calculating average note
    const currentAverageNote = getAverage(currentWeekExercises.map(e => e.note));
    const lastAverageNote = getAverage(lastWeekExercises.map(e => e.note));
    const percentageChangeAverageNote = ((currentAverageNote - lastAverageNote) / (lastAverageNote || 1)) * 100;
    const percentageChangeAverageNoteFormatted = formatPercentageChange(percentageChangeAverageNote);

    //Calculating the percentage of exercises done compared to last week
    const currentWeekCount = currentWeekExercises.length;
    const lastWeekCount = lastWeekExercises.length;
    const percentageChangeNumberExerciseDone = ((currentWeekCount - lastWeekCount) / (lastWeekCount || 1)) * 100;
    const percentageChangeNumberExerciseDoneFormatted = formatPercentageChange(percentageChangeNumberExerciseDone);

    function formatPercentageChange(value: number): string {
        if (value > 0) {
            return `+${value.toFixed(2)}% `;
        } else if (value < 0) {
            return `${value.toFixed(2)}% `;
        } else {
            return `0% (stable)`;
        }
    }

    /**
     * Render the time in hours with the format HH:MM`
     * @param seconds
        * @returns {number}
     */
    function secondsToHms(seconds: number): string {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            return `${h}h ${m}m`;
    }

    /**
     * Renter seconds in minutes in format `MM:SS`
     * @param seconds
     * @returns {number}
     */
    function secondsToMMSS(seconds: number): string {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s.toFixed(0)}s`;
    }
    return (
        <>
            <div className="flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <div className="flex items-center space-x-2">
                            <CalendarDateRangePicker />
                            <Button>Download</Button>
                        </div>
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics" disabled>
                                Math
                            </TabsTrigger>
                            <TabsTrigger value="reports" disabled>
                                Anglais
                            </TabsTrigger>
                            <TabsTrigger value="notifications" disabled>
                                Logique
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Nombre d&apos;exercices
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{numbersExerciseDone}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {percentageChangeNumberExerciseDoneFormatted} de la semaine dernière
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Temps
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{secondsToHms(timeSpent)}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {percentageChangeTimeSpentFormatted} de la semaine dernière
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Temps moyen</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <rect width="20" height="14" x="2" y="5" rx="2" />
                                            <path d="M2 10h20" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{secondsToMMSS(timeSpentAverage)}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {percentageChangeAverageTimeFormatted} de la semaine dernière
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Note moyenne
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{averageNote.toFixed(2)}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {percentageChangeAverageNoteFormatted} de la semaine dernière
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Video regardé</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Overview />
                                    </CardContent>
                                </Card>
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Dernier note d&apos;exam blanc</CardTitle>
                                        <CardDescription>
                                            Vous avez fait 5 examens blancs cette semaine
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RecentSales />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

/**
 * Get the exercises done by a user
 * @param userId
 * @returns {Promise<ExerciseDone[] | undefined>}
 */
async function exerciseDone(userId? : string): Promise<ExerciseDone[] | undefined>{
    if (!userId){
        return [];
    }

    const res = await  getExercisesDoneByUserIdAction(userId);

    if ('error' in res){
        return [];
    }

    if (res){
        return res;
    }
}