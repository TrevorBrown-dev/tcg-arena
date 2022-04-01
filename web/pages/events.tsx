import {
    EventOfferPartsFragment,
    EventOfferType,
    useCreateEventMutation,
    useEventOfferInboxSubscription,
    useEventOffersQuery,
} from '@graphql-gen';
import { Layout } from 'components/layout/Layout';
import { SidebarNavLayout } from 'components/layout/SidebarNavLayout';
import { Button } from 'components/library/Button';
import { Input } from 'components/library/Input';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export const useEventInbox = () => {
    const [eventsQuery] = useEventOffersQuery({
        requestPolicy: 'network-only',
    });
    const [events, setEvents] = useState<EventOfferPartsFragment[]>([]);

    useEffect(() => {
        if (eventsQuery.data) {
            setEvents(eventsQuery.data.eventOffers);
        }
    }, [eventsQuery.data?.eventOffers]);
    const [e] = useEventOfferInboxSubscription({
        pause: eventsQuery.fetching,
    });
    useEffect(() => {
        console.log(e.data);
        if (e.data && e.data.eventOfferInbox) {
            const newOffer = e.data.eventOfferInbox;
            if (events.find((offer) => offer.id === newOffer.id)) {
                setEvents(
                    events.map((event) => {
                        if (event.id === newOffer.id) {
                            return newOffer;
                        }
                        return event;
                    })
                );
            } else {
                setEvents([...events, newOffer]);
            }
        }
    }, [e.data]);
    return events;
};

export const Events: NextPage = () => {
    const events = useEventInbox();
    const [, createEvent] = useCreateEventMutation();
    useEffect(() => {
        console.log(events);
    }, [events]);
    const [targetId, setTargetId] = useState<string>('0');
    return (
        <Layout>
            <SidebarNavLayout>
                <h1>Events</h1>
                <Input
                    type="number"
                    value={parseInt(targetId)}
                    onChange={(e) => setTargetId(e.target.value)}
                />
                <Button
                    onClick={async () => {
                        const res = await createEvent({
                            type: EventOfferType.Game,
                            recipientId: parseInt(targetId),
                        });
                        console.log('RESPONSE', res);
                    }}
                >
                    Offer Yourself
                </Button>
                <div className="events">
                    {events.map((e, i) => (
                        <div key={i}>
                            <h2>{e.type}</h2>
                            <div>FROM: {e.issuer.userName}</div>
                            <div>TO: {e.recipient.userName}</div>
                        </div>
                    ))}
                </div>
            </SidebarNavLayout>
        </Layout>
    );
};
export default Events;
