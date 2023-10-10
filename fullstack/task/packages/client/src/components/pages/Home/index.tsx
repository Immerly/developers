import { useQuery } from '@apollo/client';
import { format, formatDistanceToNow } from 'date-fns';

import { EXCHANGE_RATES } from '../../../graphql/queries/exchange-rate.graphql';
import { Container } from '../../atoms/Container';
import { Text } from '../../atoms/Text';
import { Table } from '../../organisms/Table';

export const Home = () => {
    const { data } = useQuery(EXCHANGE_RATES);

    return (
        <Container>
            <h1 className="text-white font-bold text-center text-3xl mb-4">CzechEx</h1>
            {data ? (
                <div className="flex gap-4 flex-col">
                    <Text>
                        Last fetched and cached{' '}
                        {formatDistanceToNow(new Date(data.exchangeRates.fetchedAt), {
                            addSuffix: true,
                        })}{' '}
                        - results from {format(new Date(data.exchangeRates.fromDate), 'dd/MM/yyyy')}
                    </Text>

                    <Table data={data.exchangeRates.exchangeRates} />
                </div>
            ) : (
                <Text>Internal Error: not able to fetch</Text>
            )}
        </Container>
    );
};
