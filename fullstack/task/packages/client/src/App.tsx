import { useQuery } from '@apollo/client';
import ExchangeRatesTable from './components/ExchangeRatesTable';
import ErrorBox from './components/ErrorBox';
import { GET_EXCHANGE_RATES } from './gqls';
import './index.css';

const App = () => {
    const { loading: isLoading, error, data } = useQuery(GET_EXCHANGE_RATES);

    if (error) return <ErrorBox message={error.message} />;

    return (
        !isLoading && (
            <main className="w-full m-auto max-w-screen-md p-4">
                <ExchangeRatesTable data={data} />
            </main>
        )
    );
};

export default App;
