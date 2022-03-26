import { ExpressContext } from 'apollo-server-express';

export type SubscriptionIterator<T> = AsyncIterator<T> & T;

export type MyContext = {
    req: ExpressContext;
};
