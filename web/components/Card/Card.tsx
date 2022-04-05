import { useState } from 'react';
import { Stylable } from 'utils/types';
import { CardLayout } from './CardLayout';
import { useCardPreviewContext } from './CardPreview';
import { WithCardRecord } from './types';

type Props = WithCardRecord &
    Stylable & {
        onClick?: () => void;
        displayAmount?: boolean;
    };

export const Card: React.FC<Props> = ({
    cardRecord,
    onClick,
    className,
    style,
    displayAmount = false,
}) => {
    const { card } = cardRecord;
    const { onMouseEnter, onMouseLeave } = useCardPreviewContext();

    return (
        <CardLayout
            isFoil={cardRecord.isFoil}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
                onMouseLeave();
            }}
            className={className}
            style={style}
            onMouseEnter={() => onMouseEnter(cardRecord)}
            onMouseLeave={onMouseLeave}
        >
            <div className="header">{card.name}</div>
            <div className="image">
                <img
                    src={
                        'http://pm1.narvii.com/6293/2fe87d8f547c635befde9c8e885f9a7e2435a998_00.jpg'
                    }
                />
            </div>
            <div className="description">{card.description}</div>

            {displayAmount && (
                <div className="amount">
                    <div className="amount-container">x{cardRecord.amount}</div>
                </div>
            )}
        </CardLayout>
    );
};
