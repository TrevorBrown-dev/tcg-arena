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
import { Game } from '../Game';

@ObjectType()
export class Player implements Target {
    damage(dmgAmount: number) {
        this.health -= dmgAmount;
    }

    heal(healAmount: number) {
        this.health += healAmount;
    }

    game: string;

    @Field(() => String)
    uuid: string;
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

    startTurn() {
        this.playField.cards.forEach((card) => {
            card.attacked = false;
        });
        const game = Game.get(this.game);
        game?.executeRawCode('DRAW SELF 1;', this.uuid);

        game?.logs.push(`${this.name} starts their turn.`);
        game?.logs.push(`${this.name} drew a card.`);
        game?.emitEvent('START_TURN', null, this.uuid);
    }

    drawCards(numCards: number = 1) {
        this.deck.popAndTransfer(numCards, this.hand);
    }

    drawCard() {
        this.drawCards(1);
    }

    playCard(card: CardObj) {
        this.hand.transferCards([card.uuid], this.playField);
    }

    constructor(deckTemplate: DeckTemplate, account: Account, gameId: string) {
        this.uuid = nanoid();
        this.account = account;
        this.game = gameId;
        this.deck = Deck.create(deckTemplate, gameId, this.uuid);
    }
    static create(
        deckTemplate: DeckTemplate,
        account: Account,
        gameId: string
    ) {
        const player = new Player(deckTemplate, account, gameId);
        return player;
    }
}
