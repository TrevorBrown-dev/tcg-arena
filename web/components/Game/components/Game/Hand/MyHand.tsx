import { CardObj, Player, usePlayCardMutation } from '@graphql-gen';
import { Card } from 'components/Card/Card';
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
            });
        } else {
            playCard({
                cardUuid: card.uuid,
                gameId: game.lobby.gameId!,
            });
        }
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
                        <Card
                            className="my-card"
                            activeCard={targetState.card === card.uuid}
                            key={i}
                            onClick={() => handleClick(card as CardObj)}
                            cardRecord={{ card, isFoil: card.isFoil } as any}
                        />
                    ))}
                </div>
            </StyledHand>
            <DeckDiscard player={game.myPlayer as any} flipped={false} />
        </HandContainer>
    );
};
