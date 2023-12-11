import ExchangeRatesList from './components/exchangeRateList/ExchangeRateList';
import Timer from './components/timer/Timer';
import { useQuery } from '@apollo/client';
import { EXCHANGE_RATES } from './graphql/queries';
import React, { useCallback, useEffect, useState } from 'react';

function App() {
  const [language, setLanguage] = useState('EN');


//   support several lang in future...
  const { loading, error, data, refetch } = useQuery(EXCHANGE_RATES, {
    variables: { lang: language },
  });

  const handleTimerFinish = useCallback(async () => {
    //   support several lang in future...
    const newData = await refetch({ lang: language });

    console.log('Time is finish, do it refetch', newData);
  }, [refetch, data, language]);

  if (loading)
    return (
      <div className="relative">
        <p className="text-center absolute top-72 left-[50%]">Loading...</p>
      </div>
    );

  if (error) return <p>Error : {error} </p>;

  return (
    <div className="">
        <p className="absolute left-[50%] bottom-5 font-semibold text-xl underline">made by Tofik</p>
      <div className="flex gap-2 justify-end ">
        <button onClick={() => setLanguage('EN')} className="underline">EN</button>
        {/* Supports several lang in future... */}
      </div>
      <Timer
        cachedMaxTime={data.exchangeRates.cachedMaxTime}
        handleTimerFinish={handleTimerFinish}
      />
      <ExchangeRatesList data={data} />
      
    </div>
  );
}

export default App;
