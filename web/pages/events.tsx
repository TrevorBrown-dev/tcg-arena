import {
    EventOfferPartsFragment,
    EventOfferType,
    useCreateEventMutation,
    useEventOfferInboxSubscription,
    useEventOffersQuery,
} from '@graphql-gen';
import { useEventsInbox } from 'components/hooks/EventsInbox/useEventsInbox';
import { EventInboxContext } from 'components/layout/ContextLayout';
import { EventInboxLayout } from 'components/layout/EventInboxLayout/EventInboxLayout';
import { Layout } from 'components/layout/Layout';
import { SidebarNavLayout } from 'components/layout/SidebarNavLayout';
import { Button } from 'components/library/Button';
import { Input } from 'components/library/Input';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export const Events: NextPage = () => {
    const [, createEvent] = useCreateEventMutation();
    return (
        <EventInboxLayout>
            <Layout>
                <SidebarNavLayout>
                    <Button
                        onClick={() => {
                            createEvent({
                                type: EventOfferType.Game,
                                recipientId: 1,
                            });
                        }}
                    >
                        Create Event
                    </Button>
                </SidebarNavLayout>
            </Layout>
        </EventInboxLayout>
    );
};
export default Events;
