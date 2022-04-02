import { CardLayout } from './CardLayout';
import { WithCardRecord } from './types';

type Props = WithCardRecord & {
    onClick?: () => void;
};

export const Card: React.FC<Props> = ({ cardRecord, onClick }) => {
    const { card } = cardRecord;

    return (
        <CardLayout isFoil={cardRecord.isFoil} onClick={onClick}>
            <div className="header">{card.name}</div>
            <div className="image">
                <img src={'http://via.placeholder.com/640x360'} />
            </div>
            <div className="description">{card.description}</div>
            <div className="amount">
                <div className="amount-container">x{cardRecord.amount}</div>
            </div>
        </CardLayout>
    );
};
