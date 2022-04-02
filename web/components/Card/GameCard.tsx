import { Card } from './Card';
import { CardLayout } from './CardLayout';
import { WithCardRecord } from './types';

export const GameCard: React.FC<WithCardRecord> = ({ cardRecord }) => {
    return <Card cardRecord={cardRecord} />;
};
