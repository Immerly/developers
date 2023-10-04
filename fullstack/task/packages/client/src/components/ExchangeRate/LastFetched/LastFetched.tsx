import { useEffect, useState } from "react"

const MS_TO_MINUTE = 1000 * 60;
const INTERVAL_UPDATE = 1000 * 60;

const computeDiffInMinutes = (startDate: number, endDate: number) => {
  return Math.floor((endDate - startDate) / MS_TO_MINUTE);
}

function LastFetched() {
  const [firstTimestamp, setFirstTimestamp] = useState(() => Date.now());
  const [lastTimestamp, setLastTimestamp] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => setLastTimestamp(Date.now()), INTERVAL_UPDATE);
  
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <i>{computeDiffInMinutes(firstTimestamp, lastTimestamp)} minute(s) passed since the last fetch</i>
    </div>
  )
}

export default LastFetched
