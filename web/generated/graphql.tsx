import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  cardLibrary?: Maybe<CardLibrary>;
  email: Scalars['String'];
  friendCode: Scalars['String'];
  id: Scalars['Float'];
  userName: Scalars['String'];
};

export type AccountResponse = {
  __typename?: 'AccountResponse';
  account?: Maybe<Account>;
  errors?: Maybe<Array<FieldError>>;
};

export enum Card_Types {
  Minion = 'MINION',
  Spell = 'SPELL',
  Trap = 'TRAP'
}

export type Card = {
  __typename?: 'Card';
  code: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  metadata: CardObjMetadata;
  name: Scalars['String'];
};

export type CardInput = {
  code: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CardLibrary = {
  __typename?: 'CardLibrary';
  cards: Array<CardRecord>;
  deckTemplates?: Maybe<Array<DeckTemplate>>;
  id: Scalars['Float'];
};

export type CardObj = {
  __typename?: 'CardObj';
  attack?: Maybe<Scalars['Float']>;
  attacked?: Maybe<Scalars['Boolean']>;
  code: Scalars['String'];
  description: Scalars['String'];
  health?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  isFoil: Scalars['Boolean'];
  metadata?: Maybe<CardObjMetadata>;
  name: Scalars['String'];
  uuid: Scalars['String'];
};

export type CardObjMetadata = {
  __typename?: 'CardObjMetadata';
  ATTACK?: Maybe<Scalars['Float']>;
  HEALTH?: Maybe<Scalars['Float']>;
  NUM_TARGETS?: Maybe<Scalars['Float']>;
  RESOURCES?: Maybe<ResourceCosts>;
  TYPE?: Maybe<Card_Types>;
  VALID_TARGETS?: Maybe<Array<Targets>>;
};

export type CardRecord = {
  __typename?: 'CardRecord';
  amount: Scalars['Float'];
  card: Card;
  id: Scalars['Float'];
  isFoil: Scalars['Boolean'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  account: Account;
  id: Scalars['Float'];
  message: Scalars['String'];
};

export type Deck = {
  __typename?: 'Deck';
  cards?: Maybe<Array<CardObj>>;
  id: Scalars['String'];
  numCardsInDeck: Scalars['Float'];
};

export type DeckTemplate = {
  __typename?: 'DeckTemplate';
  cards: Array<CardRecord>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type DeckTemplateInput = {
  cardLibraryId?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type EventOffer = {
  __typename?: 'EventOffer';
  id: Scalars['String'];
  issuer: Account;
  lobbyId?: Maybe<Scalars['String']>;
  recipient: Account;
  status: EventOfferStatus;
  type: EventOfferType;
};

export enum EventOfferStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum EventOfferType {
  FriendRequest = 'FRIEND_REQUEST',
  Game = 'GAME',
  Trade = 'TRADE'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['String'];
  logs?: Maybe<GameLogs>;
  players: Array<Player>;
  turn: Scalars['String'];
  winner?: Maybe<Scalars['String']>;
};

export type GameLogs = {
  __typename?: 'GameLogs';
  logs: Array<Scalars['String']>;
};

export type Graveyard = {
  __typename?: 'Graveyard';
  cards?: Maybe<Array<CardObj>>;
  id: Scalars['String'];
};

export type Hand = {
  __typename?: 'Hand';
  cards?: Maybe<Array<CardObj>>;
  id: Scalars['String'];
  numCardsInHand: Scalars['Float'];
};

export type Lobby = {
  __typename?: 'Lobby';
  id: Scalars['String'];
  members?: Maybe<Array<Account>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOffer: EventOffer;
  addCardToDeckTemplate: DeckTemplate;
  addCardToLibrary: Array<CardRecord>;
  attack: Scalars['Boolean'];
  createCard: Card;
  createChatMessage: ChatMessage;
  createDeckTemplate: DeckTemplate;
  createLobby: Lobby;
  createOffer: EventOffer;
  declineOffer: EventOffer;
  deleteDeckTemplate: Scalars['Boolean'];
  endTurn: Scalars['Boolean'];
  increaseResource: Scalars['Boolean'];
  joinLobby: Lobby;
  leaveLobby: Lobby;
  login: AccountResponse;
  logout: Scalars['Boolean'];
  playCard: Scalars['Boolean'];
  readyUp: PreGameLobby;
  register: AccountResponse;
  removeCardFromDeckTemplate: DeckTemplate;
  removeCardFromLibrary: Scalars['Boolean'];
  selectDeck: PreGameLobby;
  updateCard: Card;
};


export type MutationAcceptOfferArgs = {
  id: Scalars['String'];
};


export type MutationAddCardToDeckTemplateArgs = {
  cardId: Scalars['Float'];
  id: Scalars['Float'];
  isFoil?: InputMaybe<Scalars['Boolean']>;
};


export type MutationAddCardToLibraryArgs = {
  cardId: Scalars['Float'];
  id: Scalars['Float'];
  isFoil?: InputMaybe<Scalars['Boolean']>;
};


export type MutationAttackArgs = {
  cardUuid: Scalars['String'];
  gameId: Scalars['String'];
  targetUuid: Array<Scalars['String']>;
};


export type MutationCreateCardArgs = {
  data: CardInput;
};


export type MutationCreateChatMessageArgs = {
  lobbyId: Scalars['String'];
  message: Scalars['String'];
};


export type MutationCreateDeckTemplateArgs = {
  data: DeckTemplateInput;
};


export type MutationCreateLobbyArgs = {
  creatorId: Scalars['Float'];
};


export type MutationCreateOfferArgs = {
  recipientFriendCode: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeclineOfferArgs = {
  id: Scalars['String'];
};


export type MutationDeleteDeckTemplateArgs = {
  id: Scalars['Float'];
};


export type MutationEndTurnArgs = {
  gameId: Scalars['String'];
};


export type MutationIncreaseResourceArgs = {
  gameId: Scalars['String'];
  resource: Scalars['String'];
};


export type MutationJoinLobbyArgs = {
  accountId: Scalars['Float'];
  id: Scalars['String'];
};


export type MutationLeaveLobbyArgs = {
  accountId: Scalars['Float'];
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPlayCardArgs = {
  cardUuid: Scalars['String'];
  gameId: Scalars['String'];
  targetUuid?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationReadyUpArgs = {
  preGameLobbyId: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveCardFromDeckTemplateArgs = {
  cardId: Scalars['Float'];
  id: Scalars['Float'];
  isFoil?: InputMaybe<Scalars['Boolean']>;
};


export type MutationRemoveCardFromLibraryArgs = {
  cardId: Scalars['Float'];
  id: Scalars['Float'];
  isFoil?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSelectDeckArgs = {
  deckTemplateId: Scalars['Float'];
  preGameLobbyId: Scalars['String'];
};


export type MutationUpdateCardArgs = {
  data: UpdateCardInput;
  id: Scalars['Float'];
};

export type PlayField = {
  __typename?: 'PlayField';
  cards?: Maybe<Array<CardObj>>;
  id: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  account: Account;
  deck?: Maybe<Deck>;
  graveyard: Graveyard;
  hand?: Maybe<Hand>;
  health?: Maybe<Scalars['Float']>;
  playField?: Maybe<PlayField>;
  resources: Resources;
  resourcesLeftToSelect: Scalars['Float'];
  uuid: Scalars['String'];
};

export type PreGameLobby = {
  __typename?: 'PreGameLobby';
  gameId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  player1: PreGamePlayer;
  player2: PreGamePlayer;
  players: Array<PreGamePlayer>;
  ready: Scalars['Boolean'];
};

export type PreGamePlayer = {
  __typename?: 'PreGamePlayer';
  account: Account;
  deckTemplate: DeckTemplate;
  id: Scalars['String'];
  ready: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  card: Card;
  cardLibraries: Array<CardLibrary>;
  cards: Array<Card>;
  cardsInLibrary: Array<CardRecord>;
  chatMessages: Array<ChatMessage>;
  deckTemplates: Array<DeckTemplate>;
  eventOffer: EventOffer;
  eventOffers: Array<EventOffer>;
  game: Game;
  initialPrivateGame: Game;
  initialPublicGame: Game;
  lobbies: Array<Lobby>;
  me?: Maybe<Account>;
  myInitialPrivateGame: Game;
  preGameLobbies: Array<PreGameLobby>;
};


export type QueryAccountArgs = {
  id: Scalars['Float'];
};


export type QueryCardArgs = {
  id: Scalars['Float'];
};


export type QueryCardsInLibraryArgs = {
  id: Scalars['Float'];
};


export type QueryEventOfferArgs = {
  id: Scalars['String'];
};


export type QueryEventOffersArgs = {
  accountId?: InputMaybe<Scalars['Float']>;
};


export type QueryGameArgs = {
  id: Scalars['String'];
};


export type QueryInitialPrivateGameArgs = {
  accountId: Scalars['Float'];
  gameId: Scalars['String'];
};


export type QueryInitialPublicGameArgs = {
  gameId: Scalars['String'];
};


export type QueryMyInitialPrivateGameArgs = {
  gameId: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type ResourceCosts = {
  __typename?: 'ResourceCosts';
  cups?: Maybe<Scalars['Float']>;
  pentacles?: Maybe<Scalars['Float']>;
  swords?: Maybe<Scalars['Float']>;
  wands?: Maybe<Scalars['Float']>;
};

export type Resources = {
  __typename?: 'Resources';
  cups: Scalars['Float'];
  pentacles: Scalars['Float'];
  swords: Scalars['Float'];
  wands: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  deckTemplateUpdated: DeckTemplate;
  eventOfferInbox: EventOffer;
  myCardLibrary: Array<CardRecord>;
  myDeckTemplates: Array<DeckTemplate>;
  watchChat: Array<ChatMessage>;
  watchLobby: Lobby;
  watchMyPrivateGame: Game;
  watchPreGameLobby: PreGameLobby;
  watchPrivateGame: Game;
  watchPublicGame: Game;
};


export type SubscriptionDeckTemplateUpdatedArgs = {
  id: Scalars['Float'];
};


export type SubscriptionWatchChatArgs = {
  lobbyId: Scalars['String'];
};


export type SubscriptionWatchLobbyArgs = {
  id: Scalars['String'];
};


export type SubscriptionWatchMyPrivateGameArgs = {
  gameId: Scalars['String'];
};


export type SubscriptionWatchPreGameLobbyArgs = {
  preGameLobbyId: Scalars['String'];
};


export type SubscriptionWatchPrivateGameArgs = {
  accountId: Scalars['Float'];
  gameId: Scalars['String'];
};


export type SubscriptionWatchPublicGameArgs = {
  gameId: Scalars['String'];
};

/** The possible targets for a card */
export enum Targets {
  All = 'ALL',
  Other = 'OTHER',
  OtherField = 'OTHER_FIELD',
  Self = 'SELF',
  SelfField = 'SELF_FIELD'
}

export type UpdateCardInput = {
  code?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type AccountPartsFragment = { __typename?: 'Account', id: number, email: string, userName: string, friendCode: string };

export type CardLibraryPartsFragment = { __typename?: 'CardLibrary', id: number, cards: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> };

export type CardPartsFragment = { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } };

export type CardRecordPartsFragment = { __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } };

export type ChatMessagePartsFragment = { __typename?: 'ChatMessage', id: number, message: string, account: { __typename?: 'Account', id: number, userName: string } };

export type DeckTemplatePartsFragment = { __typename?: 'DeckTemplate', id: number, name: string, cards: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> };

export type EventOfferPartsFragment = { __typename?: 'EventOffer', id: string, type: EventOfferType, status: EventOfferStatus, lobbyId?: string | null, issuer: { __typename?: 'Account', id: number, userName: string, friendCode: string }, recipient: { __typename?: 'Account', id: number, userName: string, friendCode: string } };

export type LobbyPartsFragment = { __typename?: 'Lobby', id: string, members?: Array<{ __typename?: 'Account', id: number, userName: string }> | null };

export type PreGameLobbyPartsFragment = { __typename?: 'PreGameLobby', id: string, ready: boolean, gameId?: string | null, players: Array<{ __typename?: 'PreGamePlayer', id: string, ready: boolean, account: { __typename?: 'Account', id: number, userName: string } }> };

export type CardObjMetadataPartsFragment = { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null };

export type CardObjPartsFragment = { __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null };

export type DeckPartsFragment = { __typename?: 'Deck', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null };

export type GraveyardPartsFragment = { __typename?: 'Graveyard', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null };

export type HandPartsFragment = { __typename?: 'Hand', id: string, numCardsInHand: number, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null };

export type PlayFieldPartsFragment = { __typename?: 'PlayField', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null };

export type PlayerPartsFragment = { __typename?: 'Player', uuid: string, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null };

export type PrivateGamePartsFragment = { __typename?: 'Game', id: string, players: Array<{ __typename?: 'Player', uuid: string, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null }> };

export type PublicGamePartsFragment = { __typename?: 'Game', id: string, turn: string, logs?: { __typename?: 'GameLogs', logs: Array<string> } | null, players: Array<{ __typename?: 'Player', uuid: string, health?: number | null, resourcesLeftToSelect: number, resources: { __typename?: 'Resources', swords: number, cups: number, wands: number, pentacles: number }, graveyard: { __typename?: 'Graveyard', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null }, account: { __typename?: 'Account', id: number, userName: string }, playField?: { __typename?: 'PlayField', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null, deck?: { __typename?: 'Deck', id: string, numCardsInDeck: number } | null, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number } | null }> };

export type ResourcesPartsFragment = { __typename?: 'Resources', swords: number, cups: number, wands: number, pentacles: number };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccountResponse', account?: { __typename?: 'Account', id: number, userName: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AccountResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, account?: { __typename?: 'Account', id: number, email: string, userName: string, friendCode: string } | null } };

export type DeleteDeckTemplateMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteDeckTemplateMutation = { __typename?: 'Mutation', deleteDeckTemplate: boolean };

export type RemoveCardFromDeckTemplateMutationVariables = Exact<{
  id: Scalars['Float'];
  cardId: Scalars['Float'];
  isFoil: Scalars['Boolean'];
}>;


export type RemoveCardFromDeckTemplateMutation = { __typename?: 'Mutation', removeCardFromDeckTemplate: { __typename?: 'DeckTemplate', id: number, name: string, cards: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> } };

export type CreateDeckTemplateMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateDeckTemplateMutation = { __typename?: 'Mutation', createDeckTemplate: { __typename?: 'DeckTemplate', id: number, name: string, cards: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> } };

export type AddCardToDeckTemplateMutationVariables = Exact<{
  cardId: Scalars['Float'];
  deckTemplateId: Scalars['Float'];
  isFoil?: InputMaybe<Scalars['Boolean']>;
}>;


export type AddCardToDeckTemplateMutation = { __typename?: 'Mutation', addCardToDeckTemplate: { __typename?: 'DeckTemplate', id: number, name: string, cards: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> } };

export type AcceptEventOfferMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AcceptEventOfferMutation = { __typename?: 'Mutation', acceptOffer: { __typename?: 'EventOffer', id: string, type: EventOfferType, status: EventOfferStatus, lobbyId?: string | null, issuer: { __typename?: 'Account', id: number, userName: string, friendCode: string }, recipient: { __typename?: 'Account', id: number, userName: string, friendCode: string } } };

export type CreateEventMutationVariables = Exact<{
  type: Scalars['String'];
  recipientFriendCode: Scalars['String'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createOffer: { __typename?: 'EventOffer', id: string, type: EventOfferType, status: EventOfferStatus, lobbyId?: string | null, issuer: { __typename?: 'Account', id: number, userName: string, friendCode: string }, recipient: { __typename?: 'Account', id: number, userName: string, friendCode: string } } };

export type DeclineEventOfferMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeclineEventOfferMutation = { __typename?: 'Mutation', declineOffer: { __typename?: 'EventOffer', id: string, type: EventOfferType, status: EventOfferStatus, lobbyId?: string | null, issuer: { __typename?: 'Account', id: number, userName: string, friendCode: string }, recipient: { __typename?: 'Account', id: number, userName: string, friendCode: string } } };

export type PlayCardMutationVariables = Exact<{
  gameId: Scalars['String'];
  cardUuid: Scalars['String'];
  targetUuid?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type PlayCardMutation = { __typename?: 'Mutation', playCard: boolean };

export type AttackMutationVariables = Exact<{
  targetUuid: Array<Scalars['String']> | Scalars['String'];
  cardUuid: Scalars['String'];
  gameId: Scalars['String'];
}>;


export type AttackMutation = { __typename?: 'Mutation', attack: boolean };

export type EndTurnMutationVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type EndTurnMutation = { __typename?: 'Mutation', endTurn: boolean };

export type IncreaseResourceMutationVariables = Exact<{
  gameId: Scalars['String'];
  resource: Scalars['String'];
}>;


export type IncreaseResourceMutation = { __typename?: 'Mutation', increaseResource: boolean };

export type CreateLobbyMutationVariables = Exact<{
  creatorId: Scalars['Float'];
}>;


export type CreateLobbyMutation = { __typename?: 'Mutation', createLobby: { __typename?: 'Lobby', id: string, members?: Array<{ __typename?: 'Account', id: number, userName: string }> | null } };

export type JoinLobbyMutationVariables = Exact<{
  accountId: Scalars['Float'];
  joinLobbyId: Scalars['String'];
}>;


export type JoinLobbyMutation = { __typename?: 'Mutation', joinLobby: { __typename?: 'Lobby', id: string, members?: Array<{ __typename?: 'Account', id: number, userName: string }> | null } };

export type LeaveLobbyMutationVariables = Exact<{
  accountId: Scalars['Float'];
  leaveLobbyId: Scalars['String'];
}>;


export type LeaveLobbyMutation = { __typename?: 'Mutation', leaveLobby: { __typename?: 'Lobby', id: string, members?: Array<{ __typename?: 'Account', id: number, userName: string }> | null } };

export type SendMessageMutationVariables = Exact<{
  lobbyId: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', createChatMessage: { __typename?: 'ChatMessage', id: number, message: string, account: { __typename?: 'Account', id: number, userName: string } } };

export type ReadyUpMutationVariables = Exact<{
  preGameLobbyId: Scalars['String'];
}>;


export type ReadyUpMutation = { __typename?: 'Mutation', readyUp: { __typename?: 'PreGameLobby', id: string, ready: boolean, gameId?: string | null, players: Array<{ __typename?: 'PreGamePlayer', id: string, ready: boolean, account: { __typename?: 'Account', id: number, userName: string } }> } };

export type SelectDeckMutationVariables = Exact<{
  deckTemplateId: Scalars['Float'];
  preGameLobbyId: Scalars['String'];
}>;


export type SelectDeckMutation = { __typename?: 'Mutation', selectDeck: { __typename?: 'PreGameLobby', id: string, ready: boolean, gameId?: string | null, players: Array<{ __typename?: 'PreGamePlayer', id: string, ready: boolean, account: { __typename?: 'Account', id: number, userName: string } }> } };

export type AccountQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type AccountQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: number, email: string, userName: string, friendCode: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', id: number, email: string, userName: string, friendCode: string } | null };

export type CardsInLibraryQueryVariables = Exact<{
  cardLibraryId: Scalars['Float'];
}>;


export type CardsInLibraryQuery = { __typename?: 'Query', cardsInLibrary: Array<{ __typename?: 'CardRecord', amount: number, isFoil: boolean, card: { __typename?: 'Card', name: string, description: string, imageUrl?: string | null } }> };

export type EventOffersQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['Float']>;
}>;


export type EventOffersQuery = { __typename?: 'Query', eventOffers: Array<{ __typename?: 'EventOffer', id: string, type: EventOfferType, status: EventOfferStatus, lobbyId?: string | null, issuer: { __typename?: 'Account', id: number, userName: string, friendCode: string }, recipient: { __typename?: 'Account', id: number, userName: string, friendCode: string } }> };

export type InitialPrivateGameQueryVariables = Exact<{
  gameId: Scalars['String'];
  accountId: Scalars['Float'];
}>;


export type InitialPrivateGameQuery = { __typename?: 'Query', initialPrivateGame: { __typename?: 'Game', id: string, players: Array<{ __typename?: 'Player', uuid: string, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null }> } };

export type InitialPublicGameQueryVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type InitialPublicGameQuery = { __typename?: 'Query', initialPublicGame: { __typename?: 'Game', id: string, turn: string, logs?: { __typename?: 'GameLogs', logs: Array<string> } | null, players: Array<{ __typename?: 'Player', uuid: string, health?: number | null, resourcesLeftToSelect: number, resources: { __typename?: 'Resources', swords: number, cups: number, wands: number, pentacles: number }, graveyard: { __typename?: 'Graveyard', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null }, account: { __typename?: 'Account', id: number, userName: string }, playField?: { __typename?: 'PlayField', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null, deck?: { __typename?: 'Deck', id: string, numCardsInDeck: number } | null, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number } | null }> } };

export type MyInitialPrivateGameQueryVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type MyInitialPrivateGameQuery = { __typename?: 'Query', myInitialPrivateGame: { __typename?: 'Game', id: string, players: Array<{ __typename?: 'Player', uuid: string, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null }> } };

export type MyCardLibrarySubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MyCardLibrarySubscription = { __typename?: 'Subscription', myCardLibrary: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> };

export type MyDeckTemplatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MyDeckTemplatesSubscription = { __typename?: 'Subscription', myDeckTemplates: Array<{ __typename?: 'DeckTemplate', id: number, name: string, cards: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> }> };

export type WatchDeckTemplateSubscriptionVariables = Exact<{
  deckTemplateId: Scalars['Float'];
}>;


export type WatchDeckTemplateSubscription = { __typename?: 'Subscription', deckTemplateUpdated: { __typename?: 'DeckTemplate', id: number, name: string, cards: Array<{ __typename?: 'CardRecord', id: number, amount: number, isFoil: boolean, card: { __typename?: 'Card', id: number, name: string, description: string, imageUrl?: string | null, metadata: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } } }> } };

export type EventOfferInboxSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EventOfferInboxSubscription = { __typename?: 'Subscription', eventOfferInbox: { __typename?: 'EventOffer', id: string, type: EventOfferType, status: EventOfferStatus, lobbyId?: string | null, issuer: { __typename?: 'Account', id: number, userName: string, friendCode: string }, recipient: { __typename?: 'Account', id: number, userName: string, friendCode: string } } };

export type WatchMyPrivateGameSubscriptionVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type WatchMyPrivateGameSubscription = { __typename?: 'Subscription', watchMyPrivateGame: { __typename?: 'Game', id: string, players: Array<{ __typename?: 'Player', uuid: string, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null }> } };

export type WatchPrivateGameSubscriptionVariables = Exact<{
  gameId: Scalars['String'];
  accountId: Scalars['Float'];
}>;


export type WatchPrivateGameSubscription = { __typename?: 'Subscription', watchPrivateGame: { __typename?: 'Game', id: string, players: Array<{ __typename?: 'Player', uuid: string, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null }> } };

export type WatchPublicGameSubscriptionVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type WatchPublicGameSubscription = { __typename?: 'Subscription', watchPublicGame: { __typename?: 'Game', id: string, turn: string, logs?: { __typename?: 'GameLogs', logs: Array<string> } | null, players: Array<{ __typename?: 'Player', uuid: string, health?: number | null, resourcesLeftToSelect: number, resources: { __typename?: 'Resources', swords: number, cups: number, wands: number, pentacles: number }, graveyard: { __typename?: 'Graveyard', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null }, account: { __typename?: 'Account', id: number, userName: string }, playField?: { __typename?: 'PlayField', id: string, cards?: Array<{ __typename?: 'CardObj', id: number, uuid: string, name: string, description: string, imageUrl?: string | null, isFoil: boolean, attack?: number | null, health?: number | null, attacked?: boolean | null, metadata?: { __typename?: 'CardObjMetadata', VALID_TARGETS?: Array<Targets> | null, TYPE?: Card_Types | null, HEALTH?: number | null, ATTACK?: number | null, NUM_TARGETS?: number | null, RESOURCES?: { __typename?: 'ResourceCosts', swords?: number | null, cups?: number | null, wands?: number | null, pentacles?: number | null } | null } | null }> | null } | null, deck?: { __typename?: 'Deck', id: string, numCardsInDeck: number } | null, hand?: { __typename?: 'Hand', id: string, numCardsInHand: number } | null }> } };

export type WatchLobbySubscriptionVariables = Exact<{
  watchLobbyId: Scalars['String'];
}>;


export type WatchLobbySubscription = { __typename?: 'Subscription', watchLobby: { __typename?: 'Lobby', id: string, members?: Array<{ __typename?: 'Account', id: number, userName: string }> | null } };

export type WatchChatSubscriptionVariables = Exact<{
  lobbyId: Scalars['String'];
}>;


export type WatchChatSubscription = { __typename?: 'Subscription', watchChat: Array<{ __typename?: 'ChatMessage', id: number, message: string, account: { __typename?: 'Account', id: number, userName: string } }> };

export type WatchPreGameLobbySubscriptionVariables = Exact<{
  preGameLobbyId: Scalars['String'];
}>;


export type WatchPreGameLobbySubscription = { __typename?: 'Subscription', watchPreGameLobby: { __typename?: 'PreGameLobby', id: string, ready: boolean, gameId?: string | null, players: Array<{ __typename?: 'PreGamePlayer', id: string, ready: boolean, account: { __typename?: 'Account', id: number, userName: string } }> } };

export const AccountPartsFragmentDoc = gql`
    fragment AccountParts on Account {
  id
  email
  userName
  friendCode
}
    `;
export const CardObjMetadataPartsFragmentDoc = gql`
    fragment CardObjMetadataParts on CardObjMetadata {
  VALID_TARGETS
  TYPE
  HEALTH
  ATTACK
  NUM_TARGETS
  RESOURCES {
    swords
    cups
    wands
    pentacles
  }
}
    `;
export const CardPartsFragmentDoc = gql`
    fragment CardParts on Card {
  id
  name
  description
  imageUrl
  metadata {
    ...CardObjMetadataParts
  }
}
    ${CardObjMetadataPartsFragmentDoc}`;
export const CardRecordPartsFragmentDoc = gql`
    fragment CardRecordParts on CardRecord {
  id
  amount
  isFoil
  card {
    ...CardParts
  }
}
    ${CardPartsFragmentDoc}`;
export const CardLibraryPartsFragmentDoc = gql`
    fragment CardLibraryParts on CardLibrary {
  id
  cards {
    ...CardRecordParts
  }
}
    ${CardRecordPartsFragmentDoc}`;
export const ChatMessagePartsFragmentDoc = gql`
    fragment ChatMessageParts on ChatMessage {
  id
  message
  account {
    id
    userName
  }
}
    `;
export const DeckTemplatePartsFragmentDoc = gql`
    fragment DeckTemplateParts on DeckTemplate {
  id
  name
  cards {
    ...CardRecordParts
  }
}
    ${CardRecordPartsFragmentDoc}`;
export const EventOfferPartsFragmentDoc = gql`
    fragment EventOfferParts on EventOffer {
  id
  type
  status
  lobbyId
  issuer {
    id
    userName
    friendCode
  }
  recipient {
    id
    userName
    friendCode
  }
}
    `;
export const LobbyPartsFragmentDoc = gql`
    fragment LobbyParts on Lobby {
  id
  members {
    id
    userName
  }
}
    `;
export const PreGameLobbyPartsFragmentDoc = gql`
    fragment PreGameLobbyParts on PreGameLobby {
  id
  ready
  gameId
  players {
    id
    ready
    account {
      id
      userName
    }
  }
}
    `;
export const CardObjPartsFragmentDoc = gql`
    fragment CardObjParts on CardObj {
  id
  uuid
  name
  description
  imageUrl
  isFoil
  attack
  health
  attacked
  metadata {
    ...CardObjMetadataParts
  }
}
    ${CardObjMetadataPartsFragmentDoc}`;
export const DeckPartsFragmentDoc = gql`
    fragment DeckParts on Deck {
  id
  cards {
    ...CardObjParts
  }
}
    ${CardObjPartsFragmentDoc}`;
export const HandPartsFragmentDoc = gql`
    fragment HandParts on Hand {
  id
  numCardsInHand
  cards {
    ...CardObjParts
  }
}
    ${CardObjPartsFragmentDoc}`;
export const PlayerPartsFragmentDoc = gql`
    fragment PlayerParts on Player {
  uuid
  hand {
    ...HandParts
  }
}
    ${HandPartsFragmentDoc}`;
export const PrivateGamePartsFragmentDoc = gql`
    fragment PrivateGameParts on Game {
  id
  players {
    ...PlayerParts
  }
}
    ${PlayerPartsFragmentDoc}`;
export const ResourcesPartsFragmentDoc = gql`
    fragment ResourcesParts on Resources {
  swords
  cups
  wands
  pentacles
}
    `;
export const GraveyardPartsFragmentDoc = gql`
    fragment GraveyardParts on Graveyard {
  id
  cards {
    ...CardObjParts
  }
}
    ${CardObjPartsFragmentDoc}`;
export const PlayFieldPartsFragmentDoc = gql`
    fragment PlayFieldParts on PlayField {
  id
  cards {
    ...CardObjParts
  }
}
    ${CardObjPartsFragmentDoc}`;
export const PublicGamePartsFragmentDoc = gql`
    fragment PublicGameParts on Game {
  id
  turn
  logs {
    logs
  }
  players {
    uuid
    health
    resourcesLeftToSelect
    resources {
      ...ResourcesParts
    }
    graveyard {
      ...GraveyardParts
    }
    account {
      id
      userName
    }
    playField {
      ...PlayFieldParts
    }
    deck {
      id
      numCardsInDeck
    }
    hand {
      id
      numCardsInHand
    }
  }
}
    ${ResourcesPartsFragmentDoc}
${GraveyardPartsFragmentDoc}
${PlayFieldPartsFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    account {
      id
      userName
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $userName: String!) {
  register(input: {email: $email, password: $password, userName: $userName}) {
    errors {
      field
      message
    }
    account {
      ...AccountParts
    }
  }
}
    ${AccountPartsFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const DeleteDeckTemplateDocument = gql`
    mutation DeleteDeckTemplate($id: Float!) {
  deleteDeckTemplate(id: $id)
}
    `;

export function useDeleteDeckTemplateMutation() {
  return Urql.useMutation<DeleteDeckTemplateMutation, DeleteDeckTemplateMutationVariables>(DeleteDeckTemplateDocument);
};
export const RemoveCardFromDeckTemplateDocument = gql`
    mutation RemoveCardFromDeckTemplate($id: Float!, $cardId: Float!, $isFoil: Boolean!) {
  removeCardFromDeckTemplate(id: $id, cardId: $cardId, isFoil: $isFoil) {
    ...DeckTemplateParts
  }
}
    ${DeckTemplatePartsFragmentDoc}`;

export function useRemoveCardFromDeckTemplateMutation() {
  return Urql.useMutation<RemoveCardFromDeckTemplateMutation, RemoveCardFromDeckTemplateMutationVariables>(RemoveCardFromDeckTemplateDocument);
};
export const CreateDeckTemplateDocument = gql`
    mutation CreateDeckTemplate($name: String!) {
  createDeckTemplate(data: {name: $name}) {
    id
    name
    cards {
      ...CardRecordParts
    }
  }
}
    ${CardRecordPartsFragmentDoc}`;

export function useCreateDeckTemplateMutation() {
  return Urql.useMutation<CreateDeckTemplateMutation, CreateDeckTemplateMutationVariables>(CreateDeckTemplateDocument);
};
export const AddCardToDeckTemplateDocument = gql`
    mutation AddCardToDeckTemplate($cardId: Float!, $deckTemplateId: Float!, $isFoil: Boolean) {
  addCardToDeckTemplate(cardId: $cardId, id: $deckTemplateId, isFoil: $isFoil) {
    ...DeckTemplateParts
  }
}
    ${DeckTemplatePartsFragmentDoc}`;

export function useAddCardToDeckTemplateMutation() {
  return Urql.useMutation<AddCardToDeckTemplateMutation, AddCardToDeckTemplateMutationVariables>(AddCardToDeckTemplateDocument);
};
export const AcceptEventOfferDocument = gql`
    mutation AcceptEventOffer($id: String!) {
  acceptOffer(id: $id) {
    ...EventOfferParts
  }
}
    ${EventOfferPartsFragmentDoc}`;

export function useAcceptEventOfferMutation() {
  return Urql.useMutation<AcceptEventOfferMutation, AcceptEventOfferMutationVariables>(AcceptEventOfferDocument);
};
export const CreateEventDocument = gql`
    mutation CreateEvent($type: String!, $recipientFriendCode: String!) {
  createOffer(type: $type, recipientFriendCode: $recipientFriendCode) {
    ...EventOfferParts
  }
}
    ${EventOfferPartsFragmentDoc}`;

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument);
};
export const DeclineEventOfferDocument = gql`
    mutation DeclineEventOffer($id: String!) {
  declineOffer(id: $id) {
    ...EventOfferParts
  }
}
    ${EventOfferPartsFragmentDoc}`;

export function useDeclineEventOfferMutation() {
  return Urql.useMutation<DeclineEventOfferMutation, DeclineEventOfferMutationVariables>(DeclineEventOfferDocument);
};
export const PlayCardDocument = gql`
    mutation PlayCard($gameId: String!, $cardUuid: String!, $targetUuid: [String!]) {
  playCard(gameId: $gameId, cardUuid: $cardUuid, targetUuid: $targetUuid)
}
    `;

export function usePlayCardMutation() {
  return Urql.useMutation<PlayCardMutation, PlayCardMutationVariables>(PlayCardDocument);
};
export const AttackDocument = gql`
    mutation Attack($targetUuid: [String!]!, $cardUuid: String!, $gameId: String!) {
  attack(targetUuid: $targetUuid, cardUuid: $cardUuid, gameId: $gameId)
}
    `;

export function useAttackMutation() {
  return Urql.useMutation<AttackMutation, AttackMutationVariables>(AttackDocument);
};
export const EndTurnDocument = gql`
    mutation EndTurn($gameId: String!) {
  endTurn(gameId: $gameId)
}
    `;

export function useEndTurnMutation() {
  return Urql.useMutation<EndTurnMutation, EndTurnMutationVariables>(EndTurnDocument);
};
export const IncreaseResourceDocument = gql`
    mutation IncreaseResource($gameId: String!, $resource: String!) {
  increaseResource(gameId: $gameId, resource: $resource)
}
    `;

export function useIncreaseResourceMutation() {
  return Urql.useMutation<IncreaseResourceMutation, IncreaseResourceMutationVariables>(IncreaseResourceDocument);
};
export const CreateLobbyDocument = gql`
    mutation CreateLobby($creatorId: Float!) {
  createLobby(creatorId: $creatorId) {
    ...LobbyParts
  }
}
    ${LobbyPartsFragmentDoc}`;

export function useCreateLobbyMutation() {
  return Urql.useMutation<CreateLobbyMutation, CreateLobbyMutationVariables>(CreateLobbyDocument);
};
export const JoinLobbyDocument = gql`
    mutation JoinLobby($accountId: Float!, $joinLobbyId: String!) {
  joinLobby(accountId: $accountId, id: $joinLobbyId) {
    ...LobbyParts
  }
}
    ${LobbyPartsFragmentDoc}`;

export function useJoinLobbyMutation() {
  return Urql.useMutation<JoinLobbyMutation, JoinLobbyMutationVariables>(JoinLobbyDocument);
};
export const LeaveLobbyDocument = gql`
    mutation LeaveLobby($accountId: Float!, $leaveLobbyId: String!) {
  leaveLobby(accountId: $accountId, id: $leaveLobbyId) {
    ...LobbyParts
  }
}
    ${LobbyPartsFragmentDoc}`;

export function useLeaveLobbyMutation() {
  return Urql.useMutation<LeaveLobbyMutation, LeaveLobbyMutationVariables>(LeaveLobbyDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($lobbyId: String!, $message: String!) {
  createChatMessage(lobbyId: $lobbyId, message: $message) {
    ...ChatMessageParts
  }
}
    ${ChatMessagePartsFragmentDoc}`;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const ReadyUpDocument = gql`
    mutation ReadyUp($preGameLobbyId: String!) {
  readyUp(preGameLobbyId: $preGameLobbyId) {
    ...PreGameLobbyParts
  }
}
    ${PreGameLobbyPartsFragmentDoc}`;

export function useReadyUpMutation() {
  return Urql.useMutation<ReadyUpMutation, ReadyUpMutationVariables>(ReadyUpDocument);
};
export const SelectDeckDocument = gql`
    mutation SelectDeck($deckTemplateId: Float!, $preGameLobbyId: String!) {
  selectDeck(deckTemplateId: $deckTemplateId, preGameLobbyId: $preGameLobbyId) {
    ...PreGameLobbyParts
  }
}
    ${PreGameLobbyPartsFragmentDoc}`;

export function useSelectDeckMutation() {
  return Urql.useMutation<SelectDeckMutation, SelectDeckMutationVariables>(SelectDeckDocument);
};
export const AccountDocument = gql`
    query Account($id: Float!) {
  account(id: $id) {
    ...AccountParts
  }
}
    ${AccountPartsFragmentDoc}`;

export function useAccountQuery(options: Omit<Urql.UseQueryArgs<AccountQueryVariables>, 'query'>) {
  return Urql.useQuery<AccountQuery>({ query: AccountDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...AccountParts
  }
}
    ${AccountPartsFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const CardsInLibraryDocument = gql`
    query CardsInLibrary($cardLibraryId: Float!) {
  cardsInLibrary(id: $cardLibraryId) {
    amount
    isFoil
    card {
      name
      description
      imageUrl
    }
  }
}
    `;

export function useCardsInLibraryQuery(options: Omit<Urql.UseQueryArgs<CardsInLibraryQueryVariables>, 'query'>) {
  return Urql.useQuery<CardsInLibraryQuery>({ query: CardsInLibraryDocument, ...options });
};
export const EventOffersDocument = gql`
    query EventOffers($accountId: Float) {
  eventOffers(accountId: $accountId) {
    ...EventOfferParts
  }
}
    ${EventOfferPartsFragmentDoc}`;

export function useEventOffersQuery(options?: Omit<Urql.UseQueryArgs<EventOffersQueryVariables>, 'query'>) {
  return Urql.useQuery<EventOffersQuery>({ query: EventOffersDocument, ...options });
};
export const InitialPrivateGameDocument = gql`
    query InitialPrivateGame($gameId: String!, $accountId: Float!) {
  initialPrivateGame(gameId: $gameId, accountId: $accountId) {
    ...PrivateGameParts
  }
}
    ${PrivateGamePartsFragmentDoc}`;

export function useInitialPrivateGameQuery(options: Omit<Urql.UseQueryArgs<InitialPrivateGameQueryVariables>, 'query'>) {
  return Urql.useQuery<InitialPrivateGameQuery>({ query: InitialPrivateGameDocument, ...options });
};
export const InitialPublicGameDocument = gql`
    query InitialPublicGame($gameId: String!) {
  initialPublicGame(gameId: $gameId) {
    ...PublicGameParts
  }
}
    ${PublicGamePartsFragmentDoc}`;

export function useInitialPublicGameQuery(options: Omit<Urql.UseQueryArgs<InitialPublicGameQueryVariables>, 'query'>) {
  return Urql.useQuery<InitialPublicGameQuery>({ query: InitialPublicGameDocument, ...options });
};
export const MyInitialPrivateGameDocument = gql`
    query MyInitialPrivateGame($gameId: String!) {
  myInitialPrivateGame(gameId: $gameId) {
    ...PrivateGameParts
  }
}
    ${PrivateGamePartsFragmentDoc}`;

export function useMyInitialPrivateGameQuery(options: Omit<Urql.UseQueryArgs<MyInitialPrivateGameQueryVariables>, 'query'>) {
  return Urql.useQuery<MyInitialPrivateGameQuery>({ query: MyInitialPrivateGameDocument, ...options });
};
export const MyCardLibraryDocument = gql`
    subscription MyCardLibrary {
  myCardLibrary {
    ...CardRecordParts
  }
}
    ${CardRecordPartsFragmentDoc}`;

export function useMyCardLibrarySubscription<TData = MyCardLibrarySubscription>(options: Omit<Urql.UseSubscriptionArgs<MyCardLibrarySubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MyCardLibrarySubscription, TData>) {
  return Urql.useSubscription<MyCardLibrarySubscription, TData, MyCardLibrarySubscriptionVariables>({ query: MyCardLibraryDocument, ...options }, handler);
};
export const MyDeckTemplatesDocument = gql`
    subscription MyDeckTemplates {
  myDeckTemplates {
    ...DeckTemplateParts
  }
}
    ${DeckTemplatePartsFragmentDoc}`;

export function useMyDeckTemplatesSubscription<TData = MyDeckTemplatesSubscription>(options: Omit<Urql.UseSubscriptionArgs<MyDeckTemplatesSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MyDeckTemplatesSubscription, TData>) {
  return Urql.useSubscription<MyDeckTemplatesSubscription, TData, MyDeckTemplatesSubscriptionVariables>({ query: MyDeckTemplatesDocument, ...options }, handler);
};
export const WatchDeckTemplateDocument = gql`
    subscription WatchDeckTemplate($deckTemplateId: Float!) {
  deckTemplateUpdated(id: $deckTemplateId) {
    ...DeckTemplateParts
  }
}
    ${DeckTemplatePartsFragmentDoc}`;

export function useWatchDeckTemplateSubscription<TData = WatchDeckTemplateSubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchDeckTemplateSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchDeckTemplateSubscription, TData>) {
  return Urql.useSubscription<WatchDeckTemplateSubscription, TData, WatchDeckTemplateSubscriptionVariables>({ query: WatchDeckTemplateDocument, ...options }, handler);
};
export const EventOfferInboxDocument = gql`
    subscription EventOfferInbox {
  eventOfferInbox {
    ...EventOfferParts
  }
}
    ${EventOfferPartsFragmentDoc}`;

export function useEventOfferInboxSubscription<TData = EventOfferInboxSubscription>(options: Omit<Urql.UseSubscriptionArgs<EventOfferInboxSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<EventOfferInboxSubscription, TData>) {
  return Urql.useSubscription<EventOfferInboxSubscription, TData, EventOfferInboxSubscriptionVariables>({ query: EventOfferInboxDocument, ...options }, handler);
};
export const WatchMyPrivateGameDocument = gql`
    subscription WatchMyPrivateGame($gameId: String!) {
  watchMyPrivateGame(gameId: $gameId) {
    ...PrivateGameParts
  }
}
    ${PrivateGamePartsFragmentDoc}`;

export function useWatchMyPrivateGameSubscription<TData = WatchMyPrivateGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchMyPrivateGameSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchMyPrivateGameSubscription, TData>) {
  return Urql.useSubscription<WatchMyPrivateGameSubscription, TData, WatchMyPrivateGameSubscriptionVariables>({ query: WatchMyPrivateGameDocument, ...options }, handler);
};
export const WatchPrivateGameDocument = gql`
    subscription WatchPrivateGame($gameId: String!, $accountId: Float!) {
  watchPrivateGame(gameId: $gameId, accountId: $accountId) {
    ...PrivateGameParts
  }
}
    ${PrivateGamePartsFragmentDoc}`;

export function useWatchPrivateGameSubscription<TData = WatchPrivateGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchPrivateGameSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchPrivateGameSubscription, TData>) {
  return Urql.useSubscription<WatchPrivateGameSubscription, TData, WatchPrivateGameSubscriptionVariables>({ query: WatchPrivateGameDocument, ...options }, handler);
};
export const WatchPublicGameDocument = gql`
    subscription WatchPublicGame($gameId: String!) {
  watchPublicGame(gameId: $gameId) {
    ...PublicGameParts
  }
}
    ${PublicGamePartsFragmentDoc}`;

export function useWatchPublicGameSubscription<TData = WatchPublicGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchPublicGameSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchPublicGameSubscription, TData>) {
  return Urql.useSubscription<WatchPublicGameSubscription, TData, WatchPublicGameSubscriptionVariables>({ query: WatchPublicGameDocument, ...options }, handler);
};
export const WatchLobbyDocument = gql`
    subscription WatchLobby($watchLobbyId: String!) {
  watchLobby(id: $watchLobbyId) {
    id
    members {
      id
      userName
    }
  }
}
    `;

export function useWatchLobbySubscription<TData = WatchLobbySubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchLobbySubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchLobbySubscription, TData>) {
  return Urql.useSubscription<WatchLobbySubscription, TData, WatchLobbySubscriptionVariables>({ query: WatchLobbyDocument, ...options }, handler);
};
export const WatchChatDocument = gql`
    subscription WatchChat($lobbyId: String!) {
  watchChat(lobbyId: $lobbyId) {
    ...ChatMessageParts
  }
}
    ${ChatMessagePartsFragmentDoc}`;

export function useWatchChatSubscription<TData = WatchChatSubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchChatSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchChatSubscription, TData>) {
  return Urql.useSubscription<WatchChatSubscription, TData, WatchChatSubscriptionVariables>({ query: WatchChatDocument, ...options }, handler);
};
export const WatchPreGameLobbyDocument = gql`
    subscription WatchPreGameLobby($preGameLobbyId: String!) {
  watchPreGameLobby(preGameLobbyId: $preGameLobbyId) {
    ...PreGameLobbyParts
  }
}
    ${PreGameLobbyPartsFragmentDoc}`;

export function useWatchPreGameLobbySubscription<TData = WatchPreGameLobbySubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchPreGameLobbySubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchPreGameLobbySubscription, TData>) {
  return Urql.useSubscription<WatchPreGameLobbySubscription, TData, WatchPreGameLobbySubscriptionVariables>({ query: WatchPreGameLobbyDocument, ...options }, handler);
};