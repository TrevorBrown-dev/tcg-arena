import { CardObj, Player, usePlayCardMutation } from '@graphql-gen';
import { Card, CardState, GameCard } from 'components/Card/Card';
import { BlankCard } from 'components/Card/CardLayout';
import { useTargetContext } from 'components/Game/utils/Targeting';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import styled from 'styled-components';
import { StyledHand } from './StyledHand';
export const HandContainer = styled.div`
    display: flex;
    .my-card {
        transition: all 0.2s ease-in-out;
        &:hover {
            transform: scale(1.02);
        }
    }
    .container {
        padding: 0.3em;
        gap: 0.6em;
    }
`;

const StyledDeckDiscard = styled.div<{ flipped?: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.8) ${({ flipped }) => (flipped ? 'rotate(180deg)' : '')};
    flex-direction: ${({ flipped }) => (flipped ? 'row-reverse' : 'row')};
    gap: 0.5em;
`;

export const DeckDiscard: React.FC<{ player: Player; flipped: boolean }> = ({
    player,
    flipped,
}) => {
    const cards = player.graveyard.cards;

    const lastCard = (cards && cards.length - 1) || 0;
    return (
        <StyledDeckDiscard flipped={flipped}>
            <div
                className="deck"
                title={`
                    ${player?.deck?.cards?.length || 0} cards in deck.
                `}
            >
                <BlankCard />
            </div>
            <div
                className="discard"
                title={`
                    ${player?.graveyard?.cards?.length || 0} cards in graveyard.
                `}
            >
                {cards && cards.length > 0 && cards[lastCard] ? (
                    <Card
                        cardRecord={{
                            amount: 1,
                            card: cards[lastCard] as any,
                            isFoil: cards[lastCard].isFoil!,
                        }}
                    />
                ) : (
                    <></>
                )}
            </div>
        </StyledDeckDiscard>
    );
};

export const MyHand: React.FC = () => {
    const game = useGameContext();
    const [, playCard] = usePlayCardMutation();
    const { targetState, setTargetState } = useTargetContext();

    const handleClick = (card: CardObj) => {
        if (!game?.lobby.gameId) return;
        if (game.publicGame?.turn !== game.myPlayer.uuid) return;
        if (
            card.metadata?.VALID_TARGETS &&
            card.metadata.VALID_TARGETS.length > 0
        ) {
            setTargetState({
                enabled: true,
                card: card.uuid,
                type: 'PLAY',
                target: null,
                numTargets: card.metadata.NUM_TARGETS || 1,
                validTargets: card.metadata.VALID_TARGETS,
            });
        } else {
            playCard({
                cardUuid: card.uuid,
                gameId: game.lobby.gameId!,
            });
        }
    };

    const mapState = (card: CardObj): CardState => {
        if (targetState.card === card.uuid) return CardState.Selected;

        if (
            targetState.validTargets &&
            targetState.validTargets.includes('SELF_HAND')
        )
            return CardState.ValidTarget;

        return CardState.Default;
    };

    const cards = game?.myPlayer?.hand?.cards;
    if (!cards)
        return (
            <HandContainer>
                <StyledHand></StyledHand>
            </HandContainer>
        );

    return (
        <HandContainer>
            <StyledHand>
                <div className="container">
                    {cards.map((card, i) => (
                        <GameCard
                            className="my-card"
                            state={mapState(card as any)}
                            key={i}
                            onClick={() => handleClick(card as CardObj)}
                            card={card as CardObj}
                        />
                    ))}
                </div>
            </StyledHand>
            <DeckDiscard player={game.myPlayer as any} flipped={false} />
        </HandContainer>
    );
};
