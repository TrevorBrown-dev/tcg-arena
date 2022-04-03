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
    damage(dmgAmount: number) {
        this.health -= dmgAmount;
    }
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
        this.account = account;
        this.deck = Deck.create(deckTemplate);

        this.hand = new Hand();
    }
    static create(deckTemplate: DeckTemplate, account: Account) {
        const player = new Player(deckTemplate, account);
        return player;
    }
}
