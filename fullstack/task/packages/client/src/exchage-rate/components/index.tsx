import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { formatDistanceToNow } from 'date-fns';
import {GET_EXCHANGE_RATES} from 'src/exchage-rate/queries';
import Typography from '@mui/material/Typography';
import ExchangeRateTable from 'src/exchage-rate/components/ExchangeRateTable';

function ExchangeRates() {
    const { loading, error, data, refetch } = useQuery(GET_EXCHANGE_RATES);
    const loadingDate = new Date();
    const [lastUpdated, setLastUpdated] = useState<string>(formatDistanceToNow(loadingDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLastUpdated(formatDistanceToNow(loadingDate));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [refetch]);

    if (loading) {
        return <Typography variant="body1">Loading...</Typography>
    }
    if (error) {
        return <Typography variant="body1">Error: {error.message}</Typography>
    }

    return (
        <>
            <Typography variant="h3">
                Exchange Rates
            </Typography>
            <Typography variant="body1">
                Last Updated: {lastUpdated}
            </Typography>
            <ExchangeRateTable rates={data.exchangeRates}  />
        </>
    );
}

export default ExchangeRates;
