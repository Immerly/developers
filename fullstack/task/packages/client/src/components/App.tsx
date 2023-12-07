import React from 'react';
import ExchangeRates from './ExchangeRates';

const App: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Currency Exchange App</h1>
            <ExchangeRates />
            <div className="mt-4">
                <p>Last Fetch: {new Date().toLocaleString()}</p>
            </div>
        </div>
    );
};

export default App;
