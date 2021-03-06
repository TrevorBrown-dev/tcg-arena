import { CardObj } from '@graphql-gen';
import { Card, CardState, GameCard } from 'components/Card/Card';
import { PlayerHealth } from 'components/Game/utils/PlayerHealth';
import { useTargetContext } from 'components/Game/utils/Targeting';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import { useEffect } from 'react';
import styled from 'styled-components';

const StyledPlayFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
`;

const StyledPlayField = styled.div`
    padding: 0 5em;
    display: flex;
    gap: 0.5em;
    .spacer {
        font-size: 0.8em;
        height: 20em;
        ::before {
            content: '';
            display: block;
        }
    }
`;

const StyledDivider = styled.div`
    display: flex;
    align-items: center;
    max-height: 1px;
    overflow: visible;
    margin: 4em 0;
    hr {
        flex: 1;
    }
    .box {
        min-width: 5em;
        min-height: 5em;
        max-width: 5em;
        max-height: 5em;
        border: 2px solid black;
        transform: rotate(45deg);
        background-color: var(--color-light);
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 0.5em 0.1em rgba(0, 0, 0, 0.3);
        .content {
            flex: 1;
            transform: rotate(-45deg) translateX(-1em);
            text-align: center;

            .top,
            .bottom {
                color: var(--color-warning);
                width: calc(100% + 2em);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.2em;
                --space: 0.2em;
            }
            .top {
                margin-bottom: var(--space);
            }
            .bottom {
                margin-top: var(--space);
            }
            hr {
                max-height: 1px;
                width: calc(100% + 2em);
                border: 0.5px solid var(--color-dark);
                overflow: visible;
            }
        }
    }
`;

const Divider: React.FC = () => {
    const game = useGameContext();
    return (
        <StyledDivider>
            <hr />
            <div className="box">
                <div className="content">
                    <div className="top">
                        <PlayerHealth
                            health={game?.otherPlayer?.health!}
                            playerId={game?.otherPlayer?.uuid!}
                        />
                    </div>
                    <hr />
                    <div className="bottom">
                        <PlayerHealth
                            health={game?.myPlayer.health!}
                            playerId={game?.myPlayer.uuid!}
                        />
                    </div>
                </div>
            </div>
            <hr />
        </StyledDivider>
    );
};

const PlayField: React.FC<{ playerId?: string }> = ({ playerId }) => {
    const game = useGameContext();
    const { addTarget, targetState } = useTargetContext();

    const playField = game?.publicGame?.players?.find(
        (player) => player.uuid === playerId
    )?.playField;

    const mapState = (card: CardObj): CardState => {
        if (targetState.card === card.uuid) return CardState.Selected;

        if (
            targetState.validTargets &&
            targetState.validTargets.includes('OTHER_FIELD')
        )
            return CardState.ValidTarget;

        return CardState.Default;
    };
    return (
        <StyledPlayField>
            <div className="spacer"></div>
            {playField?.cards?.map((card, i) => {
                return (
                    <GameCard
                        className="my-card"
                        state={mapState(card as any)}
                        onClick={() => {
                            addTarget(card.uuid);
                        }}
                        key={i}
                        card={card as CardObj}
                    />
                );
            })}
        </StyledPlayField>
    );
};

const MyPlayField: React.FC<{ playerId?: string }> = ({ playerId }) => {
    const game = useGameContext();
    const { activate, targetState } = useTargetContext();

    const playField = game?.publicGame?.players?.find(
        (player) => player.uuid === playerId
    )?.playField;

    const mapState = (card: CardObj): CardState => {
        if (targetState.card === card.uuid) return CardState.Selected;

        if (
            targetState.validTargets &&
            targetState.validTargets.includes('SELF_FIELD')
        )
            return CardState.ValidTarget;

        return CardState.Default;
    };

    return (
        <StyledPlayField>
            <div className="spacer"></div>
            {playField?.cards?.map((card, i) => {
                return (
                    <GameCard
                        className="my-card"
                        state={mapState(card as any)}
                        onClick={() => {
                            if (card.attacked) return;
                            if (game.myPlayer.uuid !== playerId) return;
                            if (game.publicGame?.turn !== game.myPlayer.uuid)
                                return;
                            activate(
                                'ATTACK',
                                card.uuid,
                                card.metadata?.NUM_TARGETS || 1,
                                ['OTHER_FIELD']
                            );
                        }}
                        key={i}
                        card={card as CardObj}
                    />
                );
            })}
        </StyledPlayField>
    );
};

export const PlayFields: React.FC = () => {
    const game = useGameContext();
    return (
        <StyledPlayFields>
            <PlayField playerId={game?.otherPlayer?.uuid} />
            <Divider />
            <MyPlayField playerId={game?.myPlayer?.uuid} />
        </StyledPlayFields>
    );
};
