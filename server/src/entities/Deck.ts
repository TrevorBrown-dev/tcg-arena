import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { shuffleArray } from '../utils/shuffleArray';
import { Card } from './Card';
import { DeckTemplate } from './DeckTemplate';
import { Game } from './Game';

@ObjectType()
@Entity()
export class Deck extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => DeckTemplate)
    @ManyToOne(() => DeckTemplate, (template) => template.decks)
    template!: DeckTemplate;

    @Field(() => [Card])
    @Column(() => Card)
    cards!: Card[];

    @OneToOne(() => Game, (game) => game.player1Deck)
    @OneToOne(() => Game, (game) => game.player2Deck)
    game: Game;

    loadCardsFromTemplate() {
        this.cards = shuffleArray([...this.template.cards]);
        this.save();
    }

    async shuffle() {
        const shuffledCards = shuffleArray([...this.cards]);
        this.cards = shuffledCards;
        await this.save();
    }

    async draw(numCards: number) {
        const drawnCards = this.cards.splice(0, numCards);
        await this.save();
        return drawnCards;
    }

    async replace(cards: Card[]) {
        this.cards = [...cards, ...this.cards];
        await this.save();
    }
}
