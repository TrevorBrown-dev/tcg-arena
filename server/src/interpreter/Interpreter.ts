import { registerEnumType } from 'type-graphql';
import { Game } from '../game/Game';
import { CardObj } from '../game/Player/Card';
import { TARGETS } from '../game/utils/Target';
import { sleep } from '../utils/sleep';
import { ActionMap } from './actions';
import { InterpreterAction } from './actions/InterpreterAction';
export enum VERBS {
    DRAW = 'DRAW',
    TAP = 'TAP',
    ATTACK = 'ATTACK',
    DESTROY = 'DESTROY',
    WHEN = 'WHEN',
}

export enum CARD_TYPES {
    MINION = 'MINION',
    SPELL = 'SPELL',
    TRAP = 'TRAP',
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
    NUM_TARGETS?: number;
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
        console.log(statements);
        const tokens = [];
        for (const statement of statements) {
            const words = statement.split(' ').filter((w) => w.length > 0);
            const verb = words.shift();
            if (!verb || !Object.values(VERBS).includes(verb as VERBS))
                continue;
            const token: Token = {
                type: verb,
                values: words,
            };
            console.log('WHEN TOKEN', token);
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
        const { actingPlayer, otherPlayer } =
            game.getActingAndOtherPlayer(playerId);
        code.BODY = code.BODY.replace(/SELF/g, actingPlayer.uuid);
        code.BODY = code.BODY.replace(/OTHER/g, otherPlayer.uuid);

        const tokens = this.tokenize(code);
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
