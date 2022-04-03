import { Field, ObjectType } from 'type-graphql';
import { Game } from './Game';

@ObjectType()
export class GameLogs {
    @Field(() => [String])
    logs: string[] = [];

    push(log: string, game?: Game) {
        this.logs.push(log);
        if (game) {
            Game.publishGame(game);
        }
    }

    logAction(game: Game, playerId: string, action: string) {
        const player = game.getPlayer(playerId);
        if (!player) {
            throw new Error('No player found');
        }

        const log = `${player.account.userName} ${action}`;
        this.push(log);
    }

    public static pluralize(count: number, noun: string) {
        if (count === 1) {
            return noun;
        }
        return `${noun}s`;
    }
}
