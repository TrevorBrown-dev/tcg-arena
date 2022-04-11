import { CardObj } from '@graphql-gen';
import { Cup } from 'components/svg/icons/Cup';
import { Pentacle } from 'components/svg/icons/Pentacle';
import { Sword } from 'components/svg/icons/Sword';
import { Wand } from 'components/svg/icons/Wand';
import { useState } from 'react';
import { Stylable } from 'utils/types';
import { CardLayout } from './CardLayout';
import { useCardPreviewContext } from './CardPreview';
import { Resource } from './Resource';
import { CardRecordPart, WithCardRecord } from './types';

export enum CardState {
    Default,
    Selected,
    ValidTarget,
}
type Props = WithCardRecord &
    Stylable & {
        onClick?: () => void;
        displayAmount?: boolean;
        state?: CardState;
    };

export const Card: React.FC<Props> = ({
    cardRecord,
    onClick,
    className,
    style,
    state = CardState.Default,
    displayAmount = false,
}) => {
    const { card } = cardRecord;
    const { onMouseEnter, onMouseLeave } = useCardPreviewContext();
    return (
        <CardLayout
            isFoil={cardRecord.isFoil}
            state={state}
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
            <div className="top">
                <div className="header">
                    <div className="left">{card.name}</div>
                    {displayAmount && (
                        <div className="amount">
                            <div className="amount-container">
                                x{cardRecord.amount}
                            </div>
                        </div>
                    )}
                </div>
                <div className="center">
                    <div className="image">
                        <img
                            src={
                                'http://pm1.narvii.com/6293/2fe87d8f547c635befde9c8e885f9a7e2435a998_00.jpg'
                            }
                        />
                    </div>
                    <div className="description">{card.description}</div>
                </div>
            </div>
            <div className="footer">
                <div className="resources">
                    <Resource
                        amount={card?.metadata.RESOURCES?.swords as number}
                        icon={<Sword width={'1em'} height="auto" />}
                    />
                    <Resource
                        amount={card?.metadata.RESOURCES?.cups as number}
                        icon={<Cup width={'1.4em'} height="auto" />}
                    />
                    <Resource
                        amount={card?.metadata.RESOURCES?.wands as number}
                        icon={<Wand width={'1em'} height="auto" />}
                    />
                    <Resource
                        amount={card?.metadata.RESOURCES?.pentacles as number}
                        icon={<Pentacle width={'2em'} height="auto" />}
                    />
                </div>
                {card.metadata.HEALTH && (
                    <div className="health">
                        {card.metadata.ATTACK || 0}/{card.metadata.HEALTH || 0}
                    </div>
                )}
            </div>
        </CardLayout>
    );
};

type GameCardProps = Stylable & {
    onClick?: () => void;
    displayAmount?: boolean;
    state?: CardState;
    card: CardObj;
};

export const GameCard: React.FC<GameCardProps> = ({
    card,
    onClick,
    className,
    style,
    state = CardState.Default,
    displayAmount = false,
}) => {
    const { onMouseEnter, onMouseLeave } = useCardPreviewContext();
    return (
        <CardLayout
            isFoil={card.isFoil}
            state={state}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
                onMouseLeave();
            }}
            className={className}
            style={style}
            // onMouseEnter={() => onMouseEnter(card as any)}
            // onMouseLeave={onMouseLeave}
        >
            <div className="top">
                <div className="header">
                    <div className="left">{card.name}</div>
                </div>
                <div className="center">
                    <div className="image">
                        <img
                            src={
                                'http://pm1.narvii.com/6293/2fe87d8f547c635befde9c8e885f9a7e2435a998_00.jpg'
                            }
                        />
                    </div>
                    <div className="description">{card.description}</div>
                </div>
            </div>
            <div className="footer">
                <div className="resources">
                    <Resource
                        amount={card?.metadata?.RESOURCES?.swords as number}
                        icon={<Sword width={'1em'} height="auto" />}
                    />
                    <Resource
                        amount={card?.metadata?.RESOURCES?.cups as number}
                        icon={<Cup width={'1.4em'} height="auto" />}
                    />
                    <Resource
                        amount={card?.metadata?.RESOURCES?.wands as number}
                        icon={<Wand width={'1em'} height="auto" />}
                    />
                    <Resource
                        amount={card?.metadata?.RESOURCES?.pentacles as number}
                        icon={<Pentacle width={'2em'} height="auto" />}
                    />
                </div>
                {card.health && (
                    <div className="health">
                        {card.attack || 0}/{card.health || 0}
                    </div>
                )}
            </div>
        </CardLayout>
    );
};
