import ExchangeRatesList from './components/exchangeRateList/ExchangeRateList';
import Timer from './components/timer/Timer';
import { useQuery } from '@apollo/client';
import { EXCHANGE_RATES } from './graphql/queries';
import React, { useCallback, useEffect, useState } from 'react';
import LastFetchTime from './components/lastFetchTime/LastFetchTime';

function App() {
  const [language, setLanguage] = useState('EN');
  const [autoUpdate, setAutoUpdate] = useState(
    localStorage.getItem('autoUpdate') === 'true'
  );
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  // support several lang in the future...
  const { loading, error, data, refetch } = useQuery(EXCHANGE_RATES, {
    variables: { lang: language },
  });

  const handleTimerFinish = useCallback(async () => {
    // support several lang in the future...
    const newData = await refetch({ lang: language });
    setLastFetchTime(new Date());
    console.log('Time is finish, do it refetch', newData);
  }, [refetch, data, language]);

  useEffect(() => {
    if (data && data.exchangeRates) {
      setLastFetchTime(new Date());
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('autoUpdate', autoUpdate.toString());
  }, [autoUpdate]);

  if (loading)
    return (
      <div className="relative">
        <p className="text-center absolute top-72 left-[50%]">Loading...</p>
      </div>
    );

  if (error) return <p>Error : {error} </p>;

  return (
    <div className="">
      <p className="absolute left-[50%] bottom-5 font-semibold text-xl underline">
        made by Tofik
      </p>
      <div className="flex gap-2 justify-end ">
        <button onClick={() => setLanguage('EN')} className="underline">
          EN
        </button>
        {/* Supports several lang in the future... */}
      </div>
      <div className="relative float-right w-6/12">
        <LastFetchTime lastFetchTime={lastFetchTime} />

        <div className="absolute left-[42%] top-[20%]">
          <div>AutoUpdate panel:</div>
          <button
            onClick={() => setAutoUpdate((prev) => !prev)}
            className="bg-slate-500 p-2 mt-2"
          >
            {autoUpdate ? 'OFF' : 'ON'}
          </button>
        </div>

        <div className="text-2xl flex flex-col justify-center items-center h-screen ">
          {autoUpdate ? (
            <Timer
              cachedMaxTime={0.3}
              handleTimerFinish={handleTimerFinish}
            />
          ) : (
            <p>Update after: OFF</p>
          )}
        </div>
      </div>

      <ExchangeRatesList data={data} />
    </div>
  );
}

export default App;
