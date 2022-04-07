import { usePlayCardMutation } from '@graphql-gen';
import { createContext, useContext, useEffect, useState } from 'react';
import { useGame, useGameContext } from './useGame/useGame';

export type TargetState = {
    enabled: boolean;
    card: string | null;
    target: string | null;
};

type TargetContext = {
    targetState: TargetState;
    setTargetState: (targetState: TargetState) => void;
};

export const targetContext = createContext<TargetContext>({
    targetState: {
        enabled: false,
        card: null,
        target: null,
    },
    setTargetState: () => {},
});

export const useTargetContext = () => useContext(targetContext)!;

export const TargetStateLayout: React.FC = ({ children }) => {
    const [, playCard] = usePlayCardMutation();
    const game = useGameContext();
    const [targetState, setTargetState] = useState<TargetState>({
        enabled: false,
        card: null,
        target: null,
    });

    useEffect(() => {
        if (targetState.card && targetState.target) {
            playCard({
                cardUuid: targetState.card,
                gameId: game.lobby.gameId!,
                targetUuid: targetState.target,
            });
            setTargetState({
                enabled: false,
                card: null,
                target: null,
            });
        }
    }, [targetState]);

    return (
        <targetContext.Provider
            value={{
                targetState,
                setTargetState,
            }}
        >
            {children}
        </targetContext.Provider>
    );
};
