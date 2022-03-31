import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Deck } from './Deck';
import { Hand } from './Hand';

@ObjectType()
export class Player {
    @Field(() => Deck)
    deck: Deck;

    @Field(() => Account)
    account: Account;

    @Field(() => Hand)
    hand: Hand;

    @Field(() => DeckTemplate)
    deckTemplate: DeckTemplate;

    constructor(deckTemplate: DeckTemplate, account: Account) {
        this.deckTemplate = deckTemplate;
        this.account = account;
        this.deck = new Deck(deckTemplate);
        this.hand = new Hand();
    }
}
