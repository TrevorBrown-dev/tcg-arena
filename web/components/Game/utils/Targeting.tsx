import { useAttackMutation, usePlayCardMutation } from '@graphql-gen';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useGame, useGameContext } from './useGame/useGame';

export type TargetState = {
    enabled: boolean;
    type: 'PLAY' | 'ATTACK' | null;
    card: string | null;
    target: string[] | null;
    numTargets: number | null;
    validTargets?: string[] | null;
};

type TargetContext = {
    targetState: TargetState;
    cancel: () => void;
    addTarget: (target: string) => void;
    removeTarget: (target: string) => void;
    setTargetState: (targetState: TargetState) => void;
    activate: (
        type: 'PLAY' | 'ATTACK',
        card: string,
        numTargets: number,
        validTargets?: string[]
    ) => void;
};

export const targetContext = createContext<TargetContext>({
    targetState: {
        enabled: false,
        type: null,
        card: null,
        target: null,
        numTargets: null,
    },
    cancel: () => {},
    activate: (type: 'PLAY' | 'ATTACK', card: string) => {},
    addTarget: () => {},
    removeTarget: () => {},
    setTargetState: () => {},
});

export const useTargetContext = () => useContext(targetContext)!;

export const TargetStateLayout: React.FC = ({ children }) => {
    const [, playCard] = usePlayCardMutation();
    const [, attack] = useAttackMutation();
    const game = useGameContext();
    const [targetState, setTargetState] = useState<TargetState>({
        enabled: false,
        card: null,
        target: null,
        type: null,
        numTargets: 0,
        validTargets: null,
    });

    const cancel = useCallback(() => {
        setTargetState({
            enabled: false,
            card: null,
            target: null,
            type: null,
            numTargets: null,
            validTargets: null,
        });
    }, [setTargetState]);

    const addTarget = useCallback(
        (target: string) => {
            if (targetState.target?.includes(target)) return;
            setTargetState({
                ...targetState,
                target: targetState.target
                    ? [...targetState.target, target]
                    : [target],
            });
        },
        [setTargetState, targetState]
    );
    const removeTarget = useCallback(
        (target: string) => {
            setTargetState({
                ...targetState,
                target: targetState.target
                    ? targetState.target.filter((t) => t !== target)
                    : [],
            });
        },
        [setTargetState, targetState]
    );

    const activate = useCallback(
        (
            type: 'PLAY' | 'ATTACK',
            card: string,
            numTargets: number,
            validTargets?: string[]
        ) => {
            setTargetState({
                enabled: true,
                type,
                target: null,
                card,
                numTargets: numTargets,
                validTargets,
            });
        },
        [setTargetState, targetState]
    );
    useEffect(() => {
        console.log('TARGETSTATE', targetState);
        if (!targetState.card || !targetState.target) return;
        if (targetState.numTargets !== targetState.target.length) return;
        if (targetState.type === 'PLAY') {
            playCard({
                cardUuid: targetState.card,
                gameId: game.lobby.gameId!,
                targetUuid: targetState.target,
            });
        } else if (targetState.type === 'ATTACK') {
            console.log('ATTACKING');
            attack({
                cardUuid: targetState.card,
                gameId: game.lobby.gameId!,
                targetUuid: targetState.target,
            });
        }

        setTargetState({
            enabled: false,
            card: null,
            target: null,
            type: null,
            numTargets: null,
            validTargets: null,
        });
    }, [targetState]);

    return (
        <targetContext.Provider
            value={{
                targetState,
                cancel,
                addTarget,
                removeTarget,
                setTargetState,
                activate,
            }}
        >
            {children}
        </targetContext.Provider>
    );
};
