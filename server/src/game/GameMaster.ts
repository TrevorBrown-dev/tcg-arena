import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Game } from './Game';
import { Player } from './Player';
type CreateGamePlayerInput = {
    account: Account;
    deckTemplate: DeckTemplate;
};
class GameMaster {
    private games: Map<string, Game>;

    constructor() {
        this.games = new Map();
    }

    public async createGame(
        player1In: CreateGamePlayerInput,
        player2AIn: CreateGamePlayerInput
    ) {
        const player1 = new Player(player1In.account, player1In.deckTemplate);
        const player2 = new Player(player2AIn.account, player2AIn.deckTemplate);
        const game = new Game(player1, player2);
    }
}

export const gameMaster = new GameMaster();
