"use client";

import { useEffect, useState } from "react";

function DaysCount({ time }: { time: number }) {
    let temp = time / (1000 * 60 * 60 * 24);
    const days = Math.floor(temp);
    temp -= days;
    temp *= 24;
    const hours = Math.floor(temp);
    temp -= hours;
    temp *= 60;
    const minutes = Math.floor(temp);
    temp -= minutes;
    temp *= 60;
    const seconds = Math.floor(temp);

    const [daysP, hoursP, minutesP, secondsP] = [days, hours, minutes, seconds].map(v => v.toString().padStart(2, "0"));

    return (
        <span className={"text-blue-500"}>
            {daysP} days {hoursP} hours {minutesP} minutes {secondsP} seconds
        </span>
    );
}

export default function Home() {
    const [time, setTime] = useState<number | undefined>();

    useEffect(() => {
        const f = async () => {
            const response = await fetch("/api/time", { method: "GET" });

            if (response.ok) {
                const body = await response.json();
                if (typeof body.time === "number") {
                    setTime(body.time);
                }
            }
        };
        void f();

        const interval = setInterval(() => setTime(v => (v ? v + 1000 : undefined)), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) {
        return (
            <div className={"w-full h-full flex flex-col justify-center items-center text-5xl font-bold"}>
                Loading...
            </div>
        );
    }

    const days = time / (1000 * 60 * 60 * 24);
    const years = (days / 365.25).toFixed(6);
    const humanLife = (days / (365.25 * 73)).toFixed(6);
    const moonCycles = (days / 29.5).toFixed(6);
    return (
        <div className={"w-full h-full flex flex-col justify-center items-center"}>
            <h1 className={"text-5xl font-bold mb-6"}>
                Time since last Next.js vulnerability: <DaysCount time={time} />
            </h1>
            <h2 className={"text-2xl font-medium"}>Roughly equals to:</h2>
            <div className={"flex flex-row justify-center items-center gap-6"}>
                <span>{years} years</span>
                <span>{humanLife} human lifetimes</span>
                <span>{moonCycles} lunar cycles</span>
            </div>
        </div>
    );
}
