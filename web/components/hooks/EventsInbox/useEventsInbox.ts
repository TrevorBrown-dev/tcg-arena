import {
    useEventOffersQuery,
    EventOfferPartsFragment,
    useEventOfferInboxSubscription,
    useMeQuery,
    EventOfferStatus,
    EventOfferType,
} from '@graphql-gen';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const useEventsInbox = () => {
    const [me] = useMeQuery();
    const [eventsQuery] = useEventOffersQuery({
        pause: !me.data?.me?.id,
        requestPolicy: 'network-only',
    });
    const [events, setEvents] = useState<EventOfferPartsFragment[]>([]);
    const [eventsInbox] = useEventOfferInboxSubscription({
        pause: eventsQuery.fetching || !me.data?.me?.id,
    });
    const router = useRouter();

    useEffect(() => {
        if (eventsQuery.data) {
            setEvents(eventsQuery.data.eventOffers);
        }
    }, [eventsQuery.data?.eventOffers]);

    useEffect(() => {
        console.log(eventsInbox.data);
        if (eventsInbox.data && eventsInbox.data.eventOfferInbox) {
            const newOffer = eventsInbox.data.eventOfferInbox;
            if (events.find((offer) => offer.id === newOffer.id)) {
                if (newOffer.status !== EventOfferStatus.Pending) {
                    setEvents(
                        events.filter((offer) => offer.id !== newOffer.id)
                    );

                    if (newOffer.status === EventOfferStatus.Accepted) {
                        switch (newOffer.type) {
                            case EventOfferType.Game:
                                if (newOffer.lobbyId) {
                                    console.log('RUNNING GAME', newOffer);
                                    router.push(`/game/${newOffer.lobbyId}`);
                                }
                        }
                    }
                } else {
                    setEvents(
                        events.map((event) => {
                            if (event.id === newOffer.id) {
                                return newOffer;
                            }
                            return event;
                        })
                    );
                }
            } else {
                setEvents([...events, newOffer]);
            }
        }
    }, [eventsInbox.data]);

    return events;
};
