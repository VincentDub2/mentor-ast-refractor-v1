import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface DateItem {
    date: string;
    description: string;
}

interface ImportantDatesProps {
    dates: DateItem[];
}

const ImportantDates: React.FC<ImportantDatesProps> = ({ dates }) => {
    return (
        <Card className="w-3/4 md:w-full bg-opacity-50">
            <CardContent className="space-y-4 p-4">
                {dates.map((dateItem, index) => (
                    <div key={index} className="flex flex-col items-start justify-between">
                        <span className="font-bold text-lg">{dateItem.date}</span>
                        <span className="text-sm text-gray-700">{dateItem.description}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default ImportantDates;
