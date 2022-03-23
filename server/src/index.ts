import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
    gql,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { createConnection } from 'typeorm';
import ormconfig from './ormconfig';
import { MyContext } from './types';
import { glob } from 'glob';
import path from 'path';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export const pubsub = new RedisPubSub({
    connection: {
        host: 'redis',
        port: 6379,
    },
});
const main = async () => {
    await createConnection(ormconfig);
    const resolvers = (await Promise.all(
        glob
            .sync(path.join(__dirname, '/resolvers/*.js'))
            .map(async (f) => (await import(f)).default)
    )) as unknown as NonEmptyArray<Function>;

    const app = express();

    app.use(express.json({ limit: '50mb' }));

    app.use(
        cors({
            origin: '*',
        })
    );

    app.use(
        jwt({
            secret: process.env.JWT_SECRET as string,
            credentialsRequired: false,
            algorithms: ['HS256'],
        })
    );
    const httpServer = createServer(app);
    const schema = await buildSchema({
        resolvers,
        emitSchemaFile: true,
        pubSub: pubsub,
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const apolloServer = new ApolloServer({
        schema,
        context: (req): MyContext => ({ req }),

        plugins: [
            // ApolloServerPluginLandingPageGraphQLPlayground,
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
    apolloServer.applyMiddleware({
        app,
        // cors: {
        //     origin: '*',
        //     // credentials: true,
        // },
    });
    // app.get('/', (_, res) => {
    //     res.redirect(apolloServer.graphqlPath);
    // });
    // app.listen(4000, () => {
    //     console.log('server started at http://localhost:4000/graphql');
    // });

    httpServer.listen(4000, () => {
        console.log('server started at http://localhost:4000/graphql');
    });
};

try {
    main();
} catch (e) {
    console.log(e);
}
