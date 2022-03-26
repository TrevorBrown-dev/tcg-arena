import { ObjectType, Field } from 'type-graphql';
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
} from 'typeorm';
import { Account } from './Account';
import { Card } from './Card';
import { Deck } from './Deck';
import { Game } from './Game';

@Entity()
@ObjectType()
export class Player extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Account, { nullable: true })
    @OneToOne(() => Game, (game) => game.player1)
    @OneToOne(() => Game, (game) => game.player2)
    game!: Game;

    @Field(() => Number)
    @Column()
    health!: number;

    @Field(() => Deck, { nullable: true })
    @OneToOne(() => Deck, (deck) => deck.player)
    deck!: Deck;

    @Field(() => [Card])
    @Column(() => Card, { array: true })
    hand!: Card[];

    async draw(n: number) {
        const cards = await this.deck.draw(n);
        this.hand = [...this.hand, ...cards];
        await this.save();
    }
}
