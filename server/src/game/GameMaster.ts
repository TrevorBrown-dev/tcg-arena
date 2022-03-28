import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Game } from './Game';
import { GameEntity as GameEntity } from '../entities/GameEntity';
import { Player } from './Player';
import { PlayerEntity as PlayerEntity } from '../entities/PlayerEntity';

class GameMaster {
    private games: Map<string, Game>;

    constructor() {
        this.games = new Map();
    }

    public async createGame(player1In: PlayerEntity, player2In: PlayerEntity) {
        const player1 = new Player(player1In.account, player1In.deckTemplate);
        const player2 = new Player(player2In.account, player2In.deckTemplate);
        const game = new Game(player1, player2);
        const gameEntity = GameEntity.create({
            player1: player1In,
            player2: player2In,
            roomId: game.id,
        });

        this.games.set(game.id, game);
        await gameEntity.save();
        return gameEntity;
    }

    public getGame(id: string) {
        return this.games.get(id);
    }
    public getGames() {
        return [...this.games.values()];
    }
}

export const gameMaster = new GameMaster();
