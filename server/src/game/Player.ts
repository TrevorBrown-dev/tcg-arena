import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Deck } from './Deck';
import { Hand } from './Hand';

@ObjectType()
export class Player {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => Deck, { nullable: true })
    deck: Deck;

    @Field(() => Account)
    account: Account;

    @Field(() => Hand)
    hand: Hand;

    @Field(() => DeckTemplate)
    deckTemplate: DeckTemplate;

    drawCards(numCards: number = 1) {
        Hand.addCardsToHand(this.hand, this.deck.draw(numCards));
    }

    drawCard() {
        this.drawCards(1);
    }

    constructor(deckTemplate: DeckTemplate, account: Account) {
        this.deckTemplate = deckTemplate;
        this.account = account;
        this.deck = new Deck(deckTemplate);
        this.hand = new Hand();
    }
}
