import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Account } from './Account';
import { Card } from './Card';
import { Deck } from './Deck';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Account, { nullable: true })
    @ManyToOne(() => Account, (account) => account.games)
    player1!: Account;

    @Field(() => Account, { nullable: true })
    @ManyToOne(() => Account, (account) => account.games)
    player2!: Account;

    @Field(() => Number)
    @Column()
    player1Health!: number;

    @Field(() => Number)
    @Column()
    player2Health!: number;

    @Field(() => Deck, { nullable: true })
    @OneToOne(() => Deck, (deck) => deck.game)
    player1Deck!: Deck;

    @Field(() => Deck, { nullable: true })
    @OneToOne(() => Deck, (deck) => deck.game)
    player2Deck!: Deck;

    @Field(() => [Card], { nullable: true })
    @Column(() => Card, { array: true })
    player1Hand!: Card[];

    @Field(() => [Card], { nullable: true })
    @Column(() => Card, { array: true })
    player2Hand!: Card[];

    async cleanUp() {
        await this.player1Deck.remove();
        await this.player2Deck.remove();
        await this.player1Hand.forEach(async (card) => await card.remove());
        await this.player2Hand.forEach(async (card) => await card.remove());
        await this.remove();
    }
}
