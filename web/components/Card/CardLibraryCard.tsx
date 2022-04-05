import { useAddCardToDeckTemplateMutation } from '../../generated/graphql';
import { useModeContext } from '../Home/Dashboard';
import { Card } from './Card';
import { CardLayout } from './CardLayout';
import { WithCardRecord } from './types';

//TODO pull this out to a type later

export const CardLibraryCard: React.FC<WithCardRecord> = ({ cardRecord }) => {
    const { card } = cardRecord;
    const { mode } = useModeContext();
    const [, addCard] = useAddCardToDeckTemplateMutation();

    return (
        <Card
            cardRecord={cardRecord}
            displayAmount={true}
            onClick={() => {
                if (mode.mode === 'edit' && mode.targetDeckId) {
                    addCard({
                        cardId: card.id,
                        deckTemplateId: mode.targetDeckId,
                        isFoil: cardRecord.isFoil,
                    });
                }
            }}
        />
    );
};
