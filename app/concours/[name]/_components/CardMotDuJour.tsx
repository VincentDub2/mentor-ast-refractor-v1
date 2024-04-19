import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import TextPresentationVert from "@/components/presentation/TextPresentationVert";

interface MotDuJourProps {
    mot: string;
    definition: string;
    exemple?: string; // Exemple est optionnel
}

const MotDuJour: React.FC<MotDuJourProps> = ({ mot, definition, exemple }) => {
    return (
        <div className="min-h-[16em] w-[20em] bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <h2 className="
                text-green-800
                font-garamond-bold
                text-1xl
                md:text-2xl
                lg:text-3xl
                text-center
                mb-4
            ">
                Le saviez-vous ?
            </h2>
            <p className="
                font-extralight
                text-gray-900
                text-lg
                md:text-xl
                mb-2
            ">
                <strong>{mot}</strong> est {definition}
            </p>
            {exemple && (
                <p className="
                    text-gray-900
                    text-lg
                    md:text-xl
                    font-garamond-italic
                ">
                    <strong>Exemple:</strong> {exemple}
                </p>
            )}
        </div>
    );
}

export default MotDuJour;
