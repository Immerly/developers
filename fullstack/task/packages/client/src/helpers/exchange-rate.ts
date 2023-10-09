import { MinutesAndSeconds } from 'src/models/ExchangeRate';

export const getSecondsAndMinutes = (createdAtUtc: string): MinutesAndSeconds => {
    const totalSeconds = Math.floor(
        (new Date().getTime() - new Date(createdAtUtc).getTime()) / 1000
    );
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return { seconds, minutes };
};
