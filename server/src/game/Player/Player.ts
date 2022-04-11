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
import { Target, TARGET_TYPE } from '../utils/Target';
import { Game } from '../Game';
@ObjectType()
export class Resources {
    @Field()
    swords: number = 0;

    @Field()
    cups: number = 0;

    @Field()
    wands: number = 0;

    @Field()
    pentacles: number = 0;
}

@ObjectType()
export class Player implements Target {
    damage(dmgAmount: number, game: Game) {
        this.health -= dmgAmount;
        if (this.health <= 0) {
            game.endGame();
        }
    }

    heal(healAmount: number, game: Game) {
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

    @Field(() => Number)
    resourcesLeftToSelect: number = 1;

    @Field(() => Resources)
    resources: Resources;

    maxResources: Resources;

    type = TARGET_TYPE.PLAYER;

    get name() {
        return this.account.userName;
    }

    startTurn(game: Game) {
        this.playField.cards.forEach((card) => {
            card.attacked = false;
        });
        game.executeRawCode('DRAW SELF 1;', this.uuid);

        game.logs.push(`${this.name} starts their turn.`);
        game.logs.push(`${this.name} drew a card.`);

        game.emitEvent('START_TURN', null, this.uuid);

        this.replenishResources();
    }

    replenishResources() {
        this.resources = {
            ...this.maxResources,
        };
        this.resourcesLeftToSelect = 1;
    }

    increaseResources(resource: keyof Resources, amount: number) {
        this.maxResources[resource] += amount;
    }

    selectResource(resource: keyof Resources, amount: number) {
        this.maxResources[resource] += amount;
        this.resources[resource] += amount;
        this.resourcesLeftToSelect -= 1;
    }

    hasResources(resources: Partial<Resources>) {
        return Object.keys(this.resources).every((resource) => {
            if (!resources[resource as keyof Resources]) return true;
            return (
                this.resources[resource as keyof Resources] >=
                resources[resource as keyof Resources]!
            );
        });
    }

    spendResources(resources: Partial<Resources>) {
        this.resources.cups -= resources.cups || 0;
        this.resources.pentacles -= resources.pentacles || 0;
        this.resources.swords -= resources.swords || 0;
        this.resources.wands -= resources.wands || 0;
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
        this.maxResources = new Resources();
        this.resources = new Resources();
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
