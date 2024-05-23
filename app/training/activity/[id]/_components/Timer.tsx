'use client'

import {useEffect, useState} from "react";

export default function Timer(){
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    useEffect(() => {
        // Démarrer le timer
        const id = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
        }, 1000) as unknown as number;

        setIntervalId(id);
        return () => clearInterval(id);
    }, []);

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <p className="hidden lg:inline-block px-2 py-1 hover:text-gray-300">
            {formatTime()}
        </p>
    )
}