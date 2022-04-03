import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { CardObj } from './Card';
import { Deck } from './Deck';
import { PlayField } from './PlayField';
import { Hand } from './Hand';
import { AccountInfo } from './PreGameLobby';

@ObjectType()
export class Player {
    static players = new Map<string, Player>();

    @Field(() => String)
    id: string = nanoid();

    @Field(() => Deck, { nullable: true })
    deck: Deck;

    @Field(() => Number, { nullable: true })
    health: number = 30;

    @Field(() => AccountInfo)
    account: AccountInfo;

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

    constructor(deckTemplate: DeckTemplate, account: AccountInfo) {
        console.log('MY DECK TEMPLATE', deckTemplate);
        this.account = account;
        this.deck = Deck.create(deckTemplate);

        this.hand = new Hand();
    }
    static create(deckTemplate: DeckTemplate, account: AccountInfo) {
        const player = new Player(deckTemplate, account);
        Player.players.set(player.id, player);
        return player;
    }
}
