import { useAdminCardsQuery, useCardsQuery } from '@graphql-gen';
import { Card } from 'components/Card/Card';
import { CardLibraryCard } from 'components/Card/CardLibraryCard';
import styled from 'styled-components';
import { useCardContext } from './SelectedCardContext';

const StyledCardGallery = styled.div`
    background-color: var(--color-light);
    color: var(--color-dark);
    display: flex;
    flex-wrap: wrap;
    padding: 2em;
    gap: 1em;
    max-height: 40vh;
`;
export const CardGallery: React.FC = () => {
    const [cardsResponse] = useAdminCardsQuery();

    const cards = cardsResponse.data?.adminCards;
    const { setCard } = useCardContext();

    return (
        <StyledCardGallery>
            {cards?.map((card, i) => {
                return (
                    <Card
                        onClick={() => setCard(card)}
                        cardRecord={{
                            card: card as any,
                            isFoil: false,
                            amount: 1,
                        }}
                        key={i}
                    />
                );
            })}
        </StyledCardGallery>
    );
};
