import styled from 'styled-components';
import {
    useCardsInLibraryQuery,
    useMeQuery,
    useMyCardLibrarySubscription,
} from '../../generated/graphql';
import { CardLibraryCard, CardRecordPart } from '../Card/CardLibraryCard';

const CardLibraryContainer = styled.div`
    flex: 1;
    padding: 2em;
    overflow: auto;
    max-height: 100vh;
    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }
`;
export const MyCardLibrary: React.FC = () => {
    const [cards] = useMyCardLibrarySubscription();
    console.log(cards);
    return (
        <CardLibraryContainer>
            <h1>Cards</h1>
            <div className="cards">
                {cards.data?.myCardLibrary.map((card, i) => (
                    <CardLibraryCard
                        key={i}
                        cardRecord={card as CardRecordPart}
                    />
                ))}
            </div>
        </CardLibraryContainer>
    );
};
