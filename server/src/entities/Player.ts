import { ObjectType, Field } from 'type-graphql';
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    OneToMany,
    ManyToMany,
    JoinColumn,
} from 'typeorm';
import { Account } from './Account';
import { Card } from './Card';
import { Deck } from './Deck';
import { DeckTemplate } from './DeckTemplate';
import { Game } from './Game';

@Entity()
@ObjectType()
export class Player extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Account)
    account!: Account;

    @Field(() => Account, { nullable: true })
    @OneToOne(() => Game, (game) => game.player1)
    @OneToOne(() => Game, (game) => game.player2)
    game!: Game;

    @Field(() => Deck, { nullable: true })
    @OneToOne(() => DeckTemplate, (deckTemplate) => deckTemplate.player)
    deckTemplate!: DeckTemplate;
}
