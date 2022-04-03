import { ExpressContext } from 'apollo-server-express';
import { Account } from './entities/Account';

export type SubscriptionIterator<T> = AsyncIterator<T> & T;

export type MyContext = {
    req: ExpressContext;
    cookie?: string;
    accountId?: number;
};
