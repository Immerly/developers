import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { ApolloProvider } from '../lib/apollo-provider';
import { routes, RoutesPath } from './routes';
import PageLayout from './layouts/PageLayout';
import { useCallback } from 'react';
import RouterController from './components/RouterController';

const App = (): JSX.Element => {
    const router = createBrowserRouter(routes);

    const navigateTo = useCallback((path: RoutesPath) => router.navigate(path));

    return (
        <PageLayout>
            <RouterController navigate={navigateTo} />
            <RouterProvider router={router}>
                <ApolloProvider />
            </RouterProvider>
        </PageLayout>
    );
};
export default App;
