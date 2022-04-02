import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { CardObj } from './Card';
import { Deck } from './Deck';
import { PlayField } from './PlayField';
import { Hand } from './Hand';

@ObjectType()
export class Player {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => Deck, { nullable: true })
    deck: Deck;

    @Field(() => Number, { nullable: true })
    health: number = 30;

    @Field(() => Account)
    account: Account;

    @Field(() => Hand, { nullable: true })
    hand: Hand;

    @Field(() => PlayField, { nullable: true })
    playField = new PlayField();

    @Field(() => DeckTemplate, { nullable: true })
    deckTemplate: DeckTemplate;

    drawCards(numCards: number = 1) {
        Hand.addCardsToHand(this.hand, this.deck.draw(numCards));
    }

    drawCard() {
        this.drawCards(1);
    }

    playCard(card: CardObj) {
        Hand.removeCardsFromHand(this.hand, [card]);
        this.playField.playCard(card);
    }

    constructor(deckTemplate: DeckTemplate, account: Account) {
        this.deckTemplate = deckTemplate;
        this.account = account;
        this.deck = new Deck(deckTemplate);
        this.hand = new Hand();
    }
}
