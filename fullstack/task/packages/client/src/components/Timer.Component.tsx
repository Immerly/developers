import React from "react";
import {useState, useEffect} from "react";

type Props = {
    createdAtUtc: string;
};

export const TimePassedTimer: React.FC<Props> = ({ createdAtUtc }: Props) => {
    const [timePassed, setTimePassed] = useState('');

    useEffect(() => {
        const updateTimePassed = () => {
            const createdAtTime = new Date(createdAtUtc).getTime();
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - createdAtTime;

            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);

            setTimePassed(`${minutes}m ${seconds}s`);
        };

        const interval = setInterval(updateTimePassed, 1000);

        return () => clearInterval(interval);
    }, [createdAtUtc]);

    return <h2>Time passed after latest fetch: {timePassed}</h2>;
};
