import {
    Client,
    ClientOptions,
    createClient,
    dedupExchange,
    fetchExchange,
    ssrExchange,
    cacheExchange as defaultCacheExchange,
} from '@urql/core';
import {
    Cache,
    cacheExchange,
    ResolveInfo,
    Variables,
} from '@urql/exchange-graphcache';

import { SSRExchange } from 'next-urql';
import { subscriptionExchange } from 'urql';
// import { wsClient } from './wsClient';
import { createClient as createWSClient } from 'graphql-ws';
import ws from 'ws';

export type CacheMutation<T> = (
    result: T,
    args: Variables,
    cache: Cache,
    info: ResolveInfo
) => void;
const isServer = typeof window === 'undefined';

export const ssrCache = ssrExchange({
    isClient: !isServer,
    initialState: !isServer ? (window as any).__URQL_DATA__ : undefined,
});

export const urqlConfig: ClientOptions = {
    url: `/graphql`,

    fetchOptions: {
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
        },
    },
    exchanges: [
        dedupExchange,
        cacheExchange({}),
        ssrCache,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription(operation) {
                return {
                    subscribe: (sink) => {
                        const wsClient = createWSClient({
                            url:
                                process.env.NODE_ENV === 'production'
                                    ? `wss://tcgarena.xyz/graphql`
                                    : `ws://localhost/graphql`,
                        });
                        const dispose = wsClient.subscribe(operation, sink);
                        return {
                            unsubscribe: dispose,
                        };
                    },
                };
            },
        }),
    ],
};

export const urqlClient = createClient(urqlConfig);
