import { Query, Resolver } from 'type-graphql';
import { Game } from '../game/Game';
import { gameMaster } from '../game/GameMaster';

@Resolver(Game)
class GameResolver {
    @Query(() => [Game])
    async games(): Promise<Game[]> {
        // const games = gameMaster.
        return gameMaster.getGames();
    }
}

export default GameResolver;
