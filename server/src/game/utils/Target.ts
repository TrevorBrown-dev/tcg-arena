import { registerEnumType } from 'type-graphql';

export enum TARGETS {
    SELF = 'SELF',
    SELF_FIELD = 'SELF_FIELD',
    OTHER = 'OTHER',
    OTHER_FIELD = 'OTHER_FIELD',
    ALL = 'ALL',
}

registerEnumType(TARGETS, {
    name: 'TARGETS',
    description: 'The possible targets for a card',
});
export interface Target {
    uuid: string;
    name: string;
    health?: number;
    damage(dmgAmount: number): void;
    heal(healAmount: number): void;
}
