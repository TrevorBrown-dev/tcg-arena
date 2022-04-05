import { Player, usePlayCardMutation } from '@graphql-gen';
import { Card } from 'components/Card/Card';
import { BlankCard } from 'components/Card/CardLayout';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import styled from 'styled-components';
import { StyledHand } from './StyledHand';
export const HandContainer = styled.div`
    display: flex;
`;

const StyledDeckDiscard = styled.div<{ flipped?: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.8) ${({ flipped }) => (flipped ? 'rotate(180deg)' : '')};
    flex-direction: ${({ flipped }) => (flipped ? 'row-reverse' : 'row')};
    gap: 0.5em;
    .deck,
    .discard {
    }
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
    return (
        <HandContainer>
            <StyledHand>
                <div className="container">
                    {game?.myPlayer?.hand?.cards &&
                        game.myPlayer.hand.cards.map((card, i) => (
                            <Card
                                key={i}
                                onClick={() => {
                                    if (!game?.lobby.gameId) return;
                                    console.log(game.lobby.gameId);
                                    playCard({
                                        gameId: game.lobby.gameId,
                                        uuid: card.uuid,
                                    });
                                }}
                                cardRecord={
                                    { card, isFoil: card.isFoil } as any
                                }
                            />
                        ))}
                </div>
            </StyledHand>
            <DeckDiscard player={game.myPlayer as any} flipped={false} />
        </HandContainer>
    );
};
