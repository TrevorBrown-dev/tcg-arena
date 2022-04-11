import { registerEnumType } from 'type-graphql';
import { Game } from '../Game';

export enum TARGETS {
    SELF = 'SELF',
    SELF_FIELD = 'SELF_FIELD',
    OTHER = 'OTHER',
    OTHER_FIELD = 'OTHER_FIELD',
    ALL = 'ALL',
}

export enum TARGET_TYPE {
    PLAYER = 'PLAYER',
    MINION = 'MINION',
}

registerEnumType(TARGETS, {
    name: 'TARGETS',
    description: 'The possible targets for a card',
});
export interface Target {
    uuid: string;
    name: string;
    type: TARGET_TYPE;
    health?: number;
    damage(dmgAmount: number, game: Game): void;
    heal(healAmount: number, game: Game): void;
}
