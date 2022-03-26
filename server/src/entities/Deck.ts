import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { shuffleArray } from '../utils/shuffleArray';
import { Card } from './Card';
import { DeckTemplate } from './DeckTemplate';
import { Player } from './Player';

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

    @OneToOne(() => Player, (player) => player.deck)
    player: Player;

    loadCardsFromTemplate() {
        this.cards = shuffleArray([...this.template.cards]);
        this.save();
    }

    public async shuffle() {
        const shuffledCards = shuffleArray([...this.cards]);
        this.cards = shuffledCards;
        await this.save();
    }

    public async draw(numCards: number) {
        const drawnCards = this.cards.splice(0, numCards);
        await this.save();
        return drawnCards;
    }

    public async replace(cards: Card[]) {
        this.cards = [...cards, ...this.cards];
        await this.save();
    }
}
