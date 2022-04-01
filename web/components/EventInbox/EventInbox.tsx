import { useEventsInboxContext } from 'components/hooks/EventsInbox/useEventsInboxContext';
import { Button } from 'components/library/Button';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventItem } from './EventItem';

const StyledEventInbox = styled.div<{ open: boolean }>`
    position: fixed;
    bottom: 0;
    right: 1em;
    width: 25rem;
    --inbox-border-color: var(--color-dark);
    border: 1px solid var(--inbox-border-color);
    background-color: var(--color-light);
    color: var(--color-dark);
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 0 5px 0 var(--color-dark);

    .header {
        user-select: none;
        background-color: var(--color-secondary);
        color: var(--color-light);
        padding: 0.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .close {
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            &:hover {
                color: var(--color-warning);
            }
        }
        .open {
            cursor: pointer;
        }
    }
    .events {
        transition: all 0.3s ease-in-out;
        max-height: 30rem;
        padding: ${({ open }) => (open ? '0.5em 1em' : '0')};
        height: ${({ open }) => (open ? `30rem` : `0px`)};
        /* height: 300px; */
        overflow: auto;
    }
`;
export const EventInbox: React.FC = () => {
    const events = useEventsInboxContext();
    const [eventLength, setEventLength] = useState(events.length);
    const [inboxVisible, setInboxVisible] = useState(false);
    useEffect(() => {}, [events]);
    useEffect(() => {
        if (events.length !== eventLength) {
            setEventLength(events.length);
            if (events.length > 0) {
                setInboxVisible(true);
            }
        }
    }, [events]);
    return true ? (
        <StyledEventInbox open={inboxVisible}>
            <div className="header" onClick={() => setInboxVisible(true)}>
                <strong>Notifications</strong>
                {inboxVisible ? (
                    <span
                        className="material-icons-outlined close"
                        onClick={(e) => {
                            e.stopPropagation();
                            setInboxVisible(false);
                        }}
                    >
                        clear
                    </span>
                ) : (
                    <span
                        className="material-icons-outlined open"
                        onClick={() => {
                            setInboxVisible(true);
                        }}
                    >
                        expand_less
                    </span>
                )}
            </div>

            <>
                {events.length > 0 ? (
                    <div className="events">
                        {events.map((event, i) => {
                            return <EventItem event={event} key={i} />;
                        })}
                    </div>
                ) : (
                    <div className="events" style={{ textAlign: 'center' }}>
                        <div>No new notifications</div>
                    </div>
                )}
            </>
        </StyledEventInbox>
    ) : (
        <></>
    );
};
