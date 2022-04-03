import { Game } from '../game/Game';
import { GameLogs } from '../game/GameLogs';

const Verbs = ['DRAW', 'ATTACK'];
const Keywords = ['SELF', 'OTHER', 'ALL'];
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

    interpret(code: string, game: Game, playerId: string) {
        const tokens = this.tokenize(code);
        const actingPlayer = game.players.find((p) => p.id === playerId);
        const otherPlayer = game.players.find((p) => p.id !== playerId);
        if (!actingPlayer) {
            console.log('No player found');
            throw new Error('No player found');
        }
        if (!otherPlayer) {
            console.log('No other player found');
            throw new Error('No other player found');
        }

        for (const token of tokens) {
            switch (token.type) {
                case 'DRAW':
                    const [target, _amount] = token.values;
                    let playerWhoDrew: string = '';
                    const amount = parseInt(_amount);
                    if (target === 'SELF') {
                        playerWhoDrew = actingPlayer.account.userName;
                        actingPlayer.drawCards(amount);
                    } else if (target === 'OTHER') {
                        otherPlayer.drawCards(amount);
                        playerWhoDrew = otherPlayer.account.userName;
                    } else {
                        throw new Error('Invalid target');
                    }
                    game.logs.push(
                        `${playerWhoDrew} drew ${amount} ${GameLogs.pluralize(
                            amount,
                            'card'
                        )}`
                    );

                    break;
                case 'ATTACK':
                    const [dmg] = token.values;
                    const dmgAmount = parseInt(dmg);
                    otherPlayer.damage(dmgAmount);
                    break;
                default:
                    throw new Error('This is not a valid verb');
            }
        }
    }
}

export const Interpreter = new _Interpreter();
