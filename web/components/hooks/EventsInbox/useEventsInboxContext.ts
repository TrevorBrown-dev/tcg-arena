import { EventOfferPartsFragment } from '@graphql-gen';
import React, { createContext, useContext } from 'react';
import { useEventsInbox } from './useEventsInbox';

export const eventsInboxContext = createContext<EventOfferPartsFragment[]>([]);

export const useEventsInboxContext = () => useContext(eventsInboxContext);
