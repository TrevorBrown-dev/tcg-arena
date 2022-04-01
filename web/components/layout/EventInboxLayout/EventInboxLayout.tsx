import { EventInbox } from 'components/EventInbox/EventInbox';
import { EventInboxContext } from '../ContextLayout';

export const EventInboxLayout: React.FC = ({ children }) => {
    return (
        <EventInboxContext>
            <EventInbox />
            {children}
        </EventInboxContext>
    );
};
