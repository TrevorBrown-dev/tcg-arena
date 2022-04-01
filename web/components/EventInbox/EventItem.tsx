import {
    EventOfferPartsFragment,
    EventOfferType,
    useAcceptEventOfferMutation,
    useDeclineEventOfferMutation,
    useMeQuery,
} from '@graphql-gen';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Stylable } from 'utils/types';

type Props = {
    event: EventOfferPartsFragment;
};

const StyledEventItem = styled.div`
    padding: 0.2em 1em;
    border: 1px solid var(--inbox-border-color);
    border-right: none;
    border-left: none;

    &:not(:last-child) {
        border-bottom: none;
    }

    :last-child {
        border-bottom: none;
    }

    :first-child {
        border-top: none;
    }

    .accept-or-reject {
        display: flex;
        justify-content: center;
        gap: 1em;
        align-items: center;
        user-select: none;
        .accept,
        .reject {
            font-weight: 400;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .accept {
            &:hover {
                color: #00b300;
            }
        }
        .reject {
            &:hover {
                color: var(--color-warning);
            }
        }
    }
`;

export const EventItem: React.FC<Props & Stylable> = ({
    event,
    style,
    className,
}) => {
    const [me] = useMeQuery();
    const [, acceptOffer] = useAcceptEventOfferMutation();
    const [, rejectOffer] = useDeclineEventOfferMutation();
    return (
        <StyledEventItem style={style} className={className}>
            {me?.data?.me?.id === event.issuer.id ? (
                <>
                    <div>Waiting for {event.recipient.userName}'s response</div>
                </>
            ) : (
                <>
                    <div>
                        {(event.type === EventOfferType.Game &&
                            `${event.issuer.userName} is inviting you to a match!`) ||
                            'Other event'}
                    </div>
                    <div className="accept-or-reject">
                        <div
                            className="accept"
                            onClick={async () => {
                                acceptOffer({
                                    id: event.id,
                                });
                            }}
                        >
                            <span className="material-icons-outlined">
                                done
                            </span>{' '}
                            Accept
                        </div>
                        <div
                            className="reject"
                            onClick={() =>
                                rejectOffer({
                                    id: event.id,
                                })
                            }
                        >
                            <span className="material-icons-outlined">
                                clear
                            </span>{' '}
                            Reject
                        </div>
                    </div>
                </>
            )}
        </StyledEventItem>
    );
};
