import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import ormconfig from './ormconfig';
import { MyContext } from './types';

//Testing how PRs work
const main = async () => {
    await createConnection(ormconfig);

    const app = express();

    app.use(express.json({ limit: '50mb' }));

    app.use(
        cors({
            origin: 'http://localhost',
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
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: ['src/resolvers/**/*.ts'],
            validate: false,
        }),
        context: (req): MyContext => ({ req }),
        plugins:
            process.env.NODE_ENV !== 'development'
                ? [ApolloServerPluginLandingPageGraphQLPlayground]
                : [ApolloServerPluginLandingPageDisabled],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost',
            credentials: true,
        },
    });
    app.get('/', (_, res) => {
        res.redirect(apolloServer.graphqlPath);
    });
    app.listen(4000, () => {
        console.log('server started at http://localhost:4000/graphql');
    });
};

try {
    main();
} catch (e) {
    console.log(e);
}
