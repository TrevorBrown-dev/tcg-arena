import { PreGameLobbyPartsFragment } from '@graphql-gen';
import { createContext, useContext } from 'react';

export const lobbyContext = createContext<PreGameLobbyPartsFragment | null>(
    null
);
export const useLobbyContext = () => useContext(lobbyContext)!;
