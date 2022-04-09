import { registerEnumType } from 'type-graphql';
import { Game } from '../game/Game';
import { CardObj } from '../game/Player/Card';
import { TARGETS } from '../game/utils/Target';
import { sleep } from '../utils/sleep';
import { ActionMap } from './actions';
import { attack } from './actions/attack';
import { destroy } from './actions/destroy';
import { draw } from './actions/draw';
import { InterpreterAction } from './actions/InterpreterAction';
export enum VERBS {
    DRAW = 'DRAW',
    ATTACK = 'ATTACK',
    DESTROY = 'DESTROY',
}

export enum CARD_TYPES {
    MINION = 'MINION',
    SPELL = 'SPELL',
}

registerEnumType(CARD_TYPES, {
    name: 'CARD_TYPES',
});

export type Token = {
    type: VERBS | unknown;
    values: string[];
};

export interface Header {
    VALID_TARGETS?: TARGETS[];
    TYPE?: CARD_TYPES;
    HEALTH?: number;
    ATTACK?: number;
    RESOURCES?: {
        name: string;
        amount: number;
    }[];
}

export interface ParsedCode {
    HEADER: Header;
    BODY: string;
}

/**
 * Card Code example:
 *
 * {
 *    "HEADER": {
 *          "VALID_TARGETS": ["SELF", "SELF_FIELD", "OTHER", "OTHER_FIELD", "ALL", "$"],
 *          "RESOURCES": [{ "name": "Mana", "amount": 1 }, { "name": "Health", "amount": 1 }]
 *   },
 *  "BODY": ""
 * }
 *
 *
 */

class _Interpreter {
    constructor(private speed: number) {}

    tokenize(code: ParsedCode): Token[] {
        console.log(code);
        const statements = code.BODY.trim().split(';');
        const tokens = [];

        for (const statement of statements) {
            const words = statement.split(' ');

            const token: Token = {
                type: '',
                values: [],
            };
            for (const word of words as VERBS[] | string[]) {
                if (Object.values(VERBS).includes(word as VERBS)) {
                    token.type = word as VERBS;
                } else {
                    token.values.push(word.trim());
                }
            }
            if (token.type) {
                tokens.push(token);
            }
        }
        if (tokens.length === 0) {
            throw new Error('No actions found');
        }
        return tokens;
    }

    parseCode(code: string): ParsedCode {
        try {
            const parsedCode = JSON.parse(code) as ParsedCode;
            return parsedCode;
        } catch {
            return {
                HEADER: {},
                BODY: code,
            };
        }
    }

    async interpret(
        code: ParsedCode,
        game: Game,
        playerId: string,
        cardId: string
    ) {
        const tokens = this.tokenize(code);
        const { actingPlayer, otherPlayer } =
            game.getActingAndOtherPlayer(playerId);

        let card: CardObj | undefined;
        if (cardId) {
            card = actingPlayer.playField.getCards([cardId])[0];
        }
        for (const token of tokens) {
            const args: Parameters<InterpreterAction> = [
                code,
                token,
                game,
                playerId,
                cardId,
            ];
            const action = ActionMap[token.type as VERBS];
            if (!action) {
                throw new Error(`Action ${token.type} not found`);
            }
            action(...args);

            await sleep(this.speed);
            await Game.publishGame(game);
        }
    }
}

export const Interpreter = new _Interpreter(500);
