import { createConnection } from 'typeorm';
import { glob } from 'glob';
import path from 'path';
import { Account } from './entities/Account';

// const entities = (async () => {
//     return await Promise.all(
//         glob
//             .sync(path.join(__dirname, '/resolvers/*.js'))
//             .map(async (f) => (await import(f)).default)
//     );
// })();

export default {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'tcgarena',
    synchronize: true, //? probably should comment out in production
    // logging: true, //? turn on if you wanna look at sql
    entities: [Account],
    // cache: {
    //     type: 'redis',
    //     host: process.env.REDIS_HOST || 'localhost',
    //     port: process.env.REDIS_PORT || 6379,
    // },
} as Parameters<typeof createConnection>[0];
