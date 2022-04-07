import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Account } from '../../entities/Account';
import { DeckTemplate } from '../../entities/DeckTemplate';
import { Deck } from './Deck';
import { PlayField } from './PlayField';
import { Hand } from './Hand';
import { CardObj } from './Card';
import { Interpreter } from '../../interpreter/Interpreter';
import { Graveyard } from './Graveyard';
import { Target } from '../utils/Target';

@ObjectType()
export class Player implements Target {
    damage(dmgAmount: number) {
        this.health -= dmgAmount;
    }

    heal(healAmount: number) {
        this.health += healAmount;
    }

    @Field(() => String)
    uuid: string = nanoid();

    @Field(() => Deck, { nullable: true })
    deck: Deck;

    @Field(() => Number, { nullable: true })
    health: number = 30;

    @Field(() => Account)
    account: Account;

    @Field(() => Hand, { nullable: true })
    hand: Hand = new Hand();

    @Field(() => PlayField, { nullable: true })
    playField = new PlayField();

    @Field(() => Graveyard)
    graveyard = new Graveyard();

    get name() {
        return this.account.userName;
    }

    drawCards(numCards: number = 1) {
        this.deck.popAndTransfer(numCards, this.hand);
    }

    drawCard() {
        this.deck.popAndTransfer(1, this.hand);
    }

    playCard(card: CardObj) {
        this.hand.transferCards([card.uuid], this.playField);
    }

    constructor(deckTemplate: DeckTemplate, account: Account) {
        this.account = account;
        this.deck = Deck.create(deckTemplate);
    }
    static create(deckTemplate: DeckTemplate, account: Account) {
        const player = new Player(deckTemplate, account);
        return player;
    }
}
