import { createConnection } from 'typeorm';

import { Account } from './entities/Account';
import { Card } from './entities/Card';
import { CardLibrary } from './entities/CardLibrary';
import { Deck } from './entities/Deck';
import { DeckTemplate } from './entities/DeckTemplate';
import { Game } from './entities/Game';
import { Player } from './entities/Player';

export default {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'tcgarena',
    synchronize: true, //? probably should comment out in production
    // logging: true, //? turn on if you wanna look at sql
    entities: [Account, Game, Card, Deck, DeckTemplate, CardLibrary, Player],
    // cache: {
    //     type: 'redis',
    //     host: process.env.REDIS_HOST || 'localhost',
    //     port: process.env.REDIS_PORT || 6379,
    // },
} as Parameters<typeof createConnection>[0];
