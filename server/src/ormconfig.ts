import { createConnection } from 'typeorm';

import { Account } from './entities/Account';
import { Card } from './entities/Card';
import { CardLibrary } from './entities/CardLibrary';
import { CardRecord } from './entities/CardRecord';
import { DeckTemplate } from './entities/DeckTemplate';
import { GameEntity } from './entities/GameEntity';
import { PlayerEntity } from './entities/PlayerEntity';

export default {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'tcgarena',
    synchronize: true, //? probably should comment out in production
    // logging: true, //? turn on if you wanna look at sql
    entities: [
        Account,
        GameEntity,
        Card,
        DeckTemplate,
        CardLibrary,
        PlayerEntity,
        CardRecord,
    ],
} as Parameters<typeof createConnection>[0];
