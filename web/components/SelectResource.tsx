import { useIncreaseResourceMutation } from '@graphql-gen';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useGameContext } from './Game/utils/useGame/useGame';
import { Cup } from './svg/icons/Cup';
import { Pentacle } from './svg/icons/Pentacle';
import { Sword } from './svg/icons/Sword';
import { Wand } from './svg/icons/Wand';

const StyledSelectResource = styled.div`
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--color-light);
    .content {
        display: flex;
        flex-direction: column;
        gap: 2.5em;
    }
    h1 {
        text-align: center;
        text-shadow: 0 0 1em var(--color-dark);
    }
    .resources {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        svg {
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            height: 10em;
            filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
            &:hover {
                transform: scale(1.1);
            }

            &:active {
                transform: scale(1);
            }
        }
    }
`;
export const SelectResource: React.FC = () => {
    const game = useGameContext();
    const [, selectResourceMutation] = useIncreaseResourceMutation();

    const selectResource = async (
        resource: 'WANDS' | 'SWORDS' | 'CUPS' | 'PENTACLES'
    ) => {
        await selectResourceMutation({
            gameId: game.lobby.gameId!,
            resource,
        });
    };

    return (
        <StyledSelectResource>
            <div className="content">
                <h1>Select a Resource</h1>
                <div className="resources">
                    <Sword
                        onClick={async () => await selectResource('SWORDS')}
                    />
                    <Cup onClick={async () => await selectResource('CUPS')} />
                    <Wand onClick={async () => await selectResource('WANDS')} />
                    <Pentacle
                        onClick={async () => await selectResource('PENTACLES')}
                    />
                </div>
            </div>
        </StyledSelectResource>
    );
};
