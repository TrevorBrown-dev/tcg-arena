import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import axios from 'axios';
import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import { glob } from 'glob';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import Redis from 'ioredis';
import path from 'path';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import {
    ConnectionManager,
    createConnection,
    getConnection,
    getConnectionManager,
    QueryBuilder,
} from 'typeorm';
import { WebSocketServer } from 'ws';
import { Account } from './entities/Account';
import { Lobby } from './entities/Lobby';
import { testGame } from './game/tester';
import ormconfig from './ormconfig';
import { MyContext } from './types';
import { customAuthChecker } from './utils/auth/customAuthChecker';
import { compiler } from './utils/axios';
import { cleanDb } from './utils/db/cleanDb';
import { parseJWT } from './utils/parseJWT';
import { handleDisconnects } from './utils/ws/handleDisconnects';

const options = {
    host: 'redis',
    port: 6379,
    retryStrategy: (times: number) => {
        // reconnect after
        return Math.min(times * 50, 2000);
    },
};

export const pubsub = new RedisPubSub({
    connection: options,
    publisher: new Redis(options),
    subscriber: new Redis(options),
});

const main = async () => {
    //Attempt to create typeORM connection to db
    try {
        await createConnection(ormconfig);
        await cleanDb();
    } catch (e) {
        console.log(e);
    }

    //Grabs all resolvers and fits them into an array with some typescript trickery
    const resolvers = (await Promise.all(
        glob
            .sync(path.join(__dirname, '/resolvers/*.js'))
            .map(async (f) => (await import(f)).default)
    )) as NonEmptyArray<Function>;

    //Basic express setup
    const app = express();

    app.use(express.json());

    app.use(
        cors({
            origin:
                process.env.NODE_ENV !== 'production'
                    ? '*'
                    : 'http://localhost',
            credentials: true,
        })
    );

    app.use(
        jwt({
            secret: process.env.JWT_SECRET as string,
            credentialsRequired: false,
            algorithms: ['HS256'],
        })
    );

    //Setting httpServer to enable subscriptions/websockets with teh schema also being setup here
    const httpServer = createServer(app);
    const schema = await buildSchema({
        resolvers,
        pubSub: pubsub,
        authChecker: customAuthChecker,
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    wsServer.on('error', (error) => {
        console.log('WS ERROR: ', error);
    });
    handleDisconnects(wsServer);

    const serverCleanup = useServer(
        {
            schema,
            context: (context, msg, args) => {
                const cookie = context.extra.request?.headers?.cookie;
                const defaultContext = {
                    context,
                    msg,
                    args,
                };
                if (!cookie) {
                    return defaultContext;
                }
                const account = parseJWT(cookie);
                if (!account || !account?.id) {
                    return defaultContext;
                }

                return {
                    context,
                    msg,
                    args,
                    accountId: account.id,
                };
            },
        },
        wsServer
    );

    //Setup for apolloServer with grahpql schema and websockets
    const apolloServer = new ApolloServer({
        schema,
        context: (req): MyContext => {
            const cookie = req.req.headers.cookie;
            if (cookie) {
                const accountInfo = parseJWT(cookie);
                if (accountInfo && parseInt(accountInfo.id)) {
                    return {
                        req,
                        accountId: parseInt(accountInfo.id),
                        cookie,
                    };
                }
            }
            return { req, cookie };
        },

        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose;
                        },
                    };
                },
            },
        ],
    });
    await apolloServer.start();

    //Applies the express server to apolloServer with the cors fix
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin:
                process.env.NODE_ENV !== 'production'
                    ? '*'
                    : 'http://localhost',
            credentials: true,
        },
    });

    httpServer.listen(4000, () => {
        console.log('server started at http://localhost:4000/graphql');
    });
};

try {
    main();
    testGame();
} catch (e) {
    console.log(e);
}
