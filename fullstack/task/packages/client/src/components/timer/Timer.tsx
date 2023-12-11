import React, { useEffect, useState, useCallback } from 'react';

type Props = {
  cachedMaxTime: number;
  handleTimerFinish: () => void;
};

const Timer: React.FC<Props> = ({ cachedMaxTime, handleTimerFinish }: Props) => {
  const [timer, setTimer] = useState(cachedMaxTime * 60);

  const resetTimer = useCallback(() => {
    setTimer(cachedMaxTime * 60);
  }, [cachedMaxTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    let timeoutId;

    const updateTimer = () => {
      setTimer((prevTimer:number) => {
        if (prevTimer === 0) {
          handleTimerFinish();
          resetTimer();
          return cachedMaxTime * 60;
        }
        return prevTimer - 1;
      });
    };

    timeoutId = setInterval(updateTimer, 1000);

    return () => clearInterval(timeoutId!);
  }, [cachedMaxTime, handleTimerFinish, resetTimer]);

  return <div className="float-right w-6/12 text-2xl flex flex-col justify-center items-center h-screen ">
    <p>Update after: </p>
    {formatTime(timer)}
  </div>;
};

export default Timer;
