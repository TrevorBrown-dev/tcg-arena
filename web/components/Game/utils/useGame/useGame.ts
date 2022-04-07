import {
    PreGameLobbyPartsFragment,
    PrivateGamePartsFragment,
    PublicGamePartsFragment,
    usePlayCardMutation,
} from '@graphql-gen';
import { createContext, useContext, useEffect, useState } from 'react';
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
export const useSpectateGame = (accountId: number) => {
    const lobby = useLobbyContext();
    const privateGame = usePrivateGame(accountId)!;
    const publicGame = usePublicGame()!;
    return {
        lobby,
        publicGame: publicGame,
        privateGame: privateGame,
    };
};

export const useGame = () => {
    const lobby = useLobbyContext();
    const privateGame = useMyPrivateGame();
    const publicGame = usePublicGame();
    const myPlayer = privateGame?.players[0];
    const myPublicPlayer = publicGame?.players.find(
        (player) => player.uuid === myPlayer?.uuid
    );

    const otherPlayer = publicGame?.players.find((player) => {
        return player.uuid !== myPlayer?.uuid;
    });
    const state = {
        lobby,
        publicGame,
        privateGame,
        myPlayer: {
            ...myPublicPlayer,
            ...myPlayer,
            hand: myPlayer?.hand,
            account: myPublicPlayer?.account,
        },
        otherPlayer,
    };

    return state;
};

export const gameContext = createContext<ReturnType<typeof useGame> | null>(
    null
);

export const useGameContext = () => useContext(gameContext)!;
