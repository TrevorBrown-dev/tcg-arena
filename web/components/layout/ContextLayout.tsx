import { useEventsInbox } from 'components/hooks/EventsInbox/useEventsInbox';
import { eventsInboxContext } from 'components/hooks/EventsInbox/useEventsInboxContext';

export const EventInboxContext: React.FC = ({ children }) => {
    const events = useEventsInbox();

    return (
        <eventsInboxContext.Provider value={events}>
            {children}
        </eventsInboxContext.Provider>
    );
};

export const ContextLayout: React.FC = ({ children }) => {
    return <EventInboxContext>{children}</EventInboxContext>;
};
