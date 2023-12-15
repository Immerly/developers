import {
    ApolloClient,
    ApolloProvider as ApolloProviderOriginal,
    from,
    InMemoryCache,
} from '@apollo/client';
import {} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import React, { useMemo } from 'react';

type Props = {
    children: React.ReactNode;
};

export function ApolloProvider({ children }: Props): JSX.Element {
    const client = useMemo(() => {
        const httpLink = new HttpLink({
            uri: 'http://localhost:4001/graphql',
        });

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            console.warn({ networkError });
            console.warn(JSON.stringify({ graphQLErrors }));

            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, path }) =>
                    console.warn(`[GraphQL error]: Message: ${message}, Path: ${path}`)
                );
            }

            if (networkError) {
                console.warn(`[Network error]: ${networkError}`);
            }
        });

        return new ApolloClient({
            link: from([errorLink, httpLink]),
            connectToDevTools: true,
            cache: new InMemoryCache({
                typePolicies: {
                    NotificationSetting: {
                        keyFields: ['notificationId'],
                    },
                },
            }),
        });
    });

    return <ApolloProviderOriginal client={client}>{children}</ApolloProviderOriginal>;
}
