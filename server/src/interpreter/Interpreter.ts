import { Game } from '../game/Game';
import { GameLogs } from '../game/GameLogs';
import { CardObj } from '../game/Player/Card';
import { sleep } from '../utils/sleep';

const Verbs = ['DRAW', 'ATTACK', 'DESTROY'];
const Targets = ['SELF', 'SELF_FIELD', 'OTHER', 'OTHER_FIELD', 'ALL', '$'];
type Token = {
    type: string;
    values: string[];
};

class _Interpreter {
    constructor() {}

    tokenize(code: string): Token[] {
        console.log(code);
        const statements = code.trim().split(';');
        const tokens = [];

        for (const statement of statements) {
            const words = statement.split(' ');

            const token: Token = {
                type: '',
                values: [],
            };
            for (const word of words) {
                if (Verbs.includes(word)) {
                    token.type = word.trim();
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

    async interpret(
        code: string,
        game: Game,
        playerId: string,
        cardId?: string
    ) {
        const tokens = this.tokenize(code);
        const actingPlayer = game.players.find((p) => p.id === playerId);
        const otherPlayer = game.players.find((p) => p.id !== playerId);
        let card: CardObj | undefined;
        if (!actingPlayer) {
            console.log('No player found');
            throw new Error('No player found');
        }
        if (!otherPlayer) {
            console.log('No other player found');
            throw new Error('No other player found');
        }
        if (cardId) {
            card = actingPlayer.playField.getCards([cardId])[0];
        }
        for (const token of tokens) {
            switch (token.type) {
                case 'DRAW':
                    const [target, _amount] = token.values;
                    let playerWhoDrew: string = '';
                    const amount = parseInt(_amount);
                    if (target === 'SELF') {
                        actingPlayer.drawCards(amount);
                    } else if (target === 'OTHER') {
                        otherPlayer.drawCards(amount);
                    } else {
                        throw new Error('Invalid target');
                    }

                    break;
                case 'ATTACK':
                    const [dmg] = token.values;
                    const dmgAmount = parseInt(dmg);
                    otherPlayer.damage(dmgAmount);
                    break;
                case 'DESTROY':
                    console.log(cardId);
                    if (!cardId) {
                        throw new Error('No card id found');
                    }
                    actingPlayer.playField.transferCards(
                        [cardId],
                        actingPlayer.graveyard
                    );
                    break;
                default:
                    throw new Error('This is not a valid verb');
            }

            await sleep(1000);
            await Game.publishGame(game);
        }
    }
}

export const Interpreter = new _Interpreter();
