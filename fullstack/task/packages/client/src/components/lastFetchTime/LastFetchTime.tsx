import React, { useEffect, useState } from 'react';

type Props = {
  lastFetchTime: Date | null;
};

const LastFetchTime: React.FC<Props> = ({ lastFetchTime }: Props) => {
  const [elapsedTime, setElapsedTime] = useState<string>('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateElapsedTime = () => {
      if (lastFetchTime) {
        const now = new Date();
        const diffInMilliseconds = now.getTime() - lastFetchTime.getTime();
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        setElapsedTime(`${hours} hours, ${minutes} minutes, and ${seconds} seconds`);
      }
    };

    intervalId = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(intervalId);
  }, [lastFetchTime]);

  return (
    <div>
      {lastFetchTime && <p>Last fetched: {elapsedTime} ago</p>}
    </div>
  );
};

export default LastFetchTime;
