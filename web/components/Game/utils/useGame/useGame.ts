import {
    PreGameLobbyPartsFragment,
    PrivateGamePartsFragment,
    PublicGamePartsFragment,
} from '@graphql-gen';
import { useLobbyContext } from '../lobbyContext';
import { useMyPrivateGame } from './useMyPrivateGame';
import { usePrivateGame } from './usePrivateGame';
import { usePublicGame } from './usePublicGame';

export type UseGameResponse = {
    lobby: PreGameLobbyPartsFragment;
    privateGame: PrivateGamePartsFragment;
    publicGame: PublicGamePartsFragment;
};

//Needs reworking this will be for spectating
export const useSpectateGame = (accountId: number): UseGameResponse => {
    const lobby = useLobbyContext();
    const privateGame = usePrivateGame(accountId)!;
    const publicGame = usePublicGame()!;

    return {
        lobby,
        publicGame: publicGame,
        privateGame: privateGame,
    };
};

export const useGame = (): UseGameResponse => {
    const lobby = useLobbyContext();
    const privateGame = useMyPrivateGame()!;
    const publicGame = usePublicGame()!;

    return {
        lobby,
        publicGame: publicGame,
        privateGame: privateGame,
    };
};
