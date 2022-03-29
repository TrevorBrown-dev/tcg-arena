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
  id: Scalars['Float'];
  userName: Scalars['String'];
};

export type AccountResponse = {
  __typename?: 'AccountResponse';
  account?: Maybe<Account>;
  errors?: Maybe<Array<FieldError>>;
};

export type Card = {
  __typename?: 'Card';
  code: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CardInput = {
  code: Scalars['String'];
  description: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CardLibrary = {
  __typename?: 'CardLibrary';
  cards: Array<CardRecord>;
  deckTemplates: DeckTemplate;
  id: Scalars['Float'];
};

export type CardRecord = {
  __typename?: 'CardRecord';
  amount: Scalars['Float'];
  card: Card;
  id: Scalars['Float'];
};

export type Deck = {
  __typename?: 'Deck';
  deck?: Maybe<Array<Card>>;
  template?: Maybe<DeckTemplate>;
};

export type DeckTemplate = {
  __typename?: 'DeckTemplate';
  cards: Array<CardRecord>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type DeckTemplateInput = {
  cardLibraryId: Scalars['Float'];
  name: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['String'];
  noticeMe: Scalars['String'];
  player1: Player;
  player2: Player;
};

export type GameEntity = {
  __typename?: 'GameEntity';
  id: Scalars['Float'];
  player1?: Maybe<PlayerEntity>;
  player2?: Maybe<PlayerEntity>;
  roomId?: Maybe<Scalars['String']>;
};

export type GameInput = {
  p1DeckTemplateId: Scalars['Float'];
  p2DeckTemplateId: Scalars['Float'];
  player1Id: Scalars['Float'];
  player2Id: Scalars['Float'];
};

export type Lobby = {
  __typename?: 'Lobby';
  id: Scalars['String'];
  members?: Maybe<Array<Account>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCardToDeckTemplate: DeckTemplate;
  addCardToLibrary: Array<CardRecord>;
  createCard: Card;
  createDeckTemplate: DeckTemplate;
  createGame: GameEntity;
  createLobby: Lobby;
  joinLobby: Lobby;
  leaveLobby: Lobby;
  login: AccountResponse;
  logout: Scalars['Boolean'];
  register: AccountResponse;
  removeCardFromLibrary: Scalars['Boolean'];
  updateGame: GameEntity;
};


export type MutationAddCardToDeckTemplateArgs = {
  cardId: Scalars['Float'];
  id: Scalars['Float'];
};


export type MutationAddCardToLibraryArgs = {
  cardId: Scalars['Float'];
  id: Scalars['Float'];
};


export type MutationCreateCardArgs = {
  data: CardInput;
};


export type MutationCreateDeckTemplateArgs = {
  data: DeckTemplateInput;
};


export type MutationCreateGameArgs = {
  data: GameInput;
};


export type MutationCreateLobbyArgs = {
  creatorId: Scalars['Float'];
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


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveCardFromLibraryArgs = {
  cardId: Scalars['Float'];
  id: Scalars['Float'];
};


export type MutationUpdateGameArgs = {
  data: GameInput;
  id: Scalars['Float'];
};

export type Player = {
  __typename?: 'Player';
  deck: Deck;
  hand: Array<Card>;
  health: Scalars['Float'];
};

export type PlayerEntity = {
  __typename?: 'PlayerEntity';
  deckTemplate?: Maybe<DeckTemplate>;
  game?: Maybe<Account>;
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  card: Card;
  cardLibraries: Array<CardLibrary>;
  cards: Array<Card>;
  cardsInLibrary: Array<CardRecord>;
  deckTemplates: Array<DeckTemplate>;
  game: GameEntity;
  games: Array<Game>;
  lobbies: Array<Lobby>;
  me?: Maybe<Account>;
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


export type QueryGameArgs = {
  id: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  deckTemplateUpdated: DeckTemplate;
  watchGame: GameEntity;
  watchLobby: Lobby;
};


export type SubscriptionDeckTemplateUpdatedArgs = {
  id: Scalars['Float'];
};


export type SubscriptionWatchGameArgs = {
  gameId: Scalars['Float'];
};


export type SubscriptionWatchLobbyArgs = {
  accountId: Scalars['Float'];
  id: Scalars['String'];
};

export type AccountPartsFragment = { __typename?: 'Account', id: number, email: string, userName: string };

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


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AccountResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, account?: { __typename?: 'Account', id: number, email: string, userName: string } | null } };

export type AccountQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type AccountQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: number, email: string, userName: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', userName: string, email: string, id: number, cardLibrary?: { __typename?: 'CardLibrary', id: number } | null } | null };

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


export type LeaveLobbyMutation = { __typename?: 'Mutation', leaveLobby: { __typename?: 'Lobby', id: string, members?: Array<{ __typename?: 'Account', userName: string }> | null } };

export type WatchLobbySubscriptionVariables = Exact<{
  watchLobbyId: Scalars['String'];
  accountId: Scalars['Float'];
}>;


export type WatchLobbySubscription = { __typename?: 'Subscription', watchLobby: { __typename?: 'Lobby', id: string, members?: Array<{ __typename?: 'Account', id: number, userName: string }> | null } };

export const AccountPartsFragmentDoc = gql`
    fragment AccountParts on Account {
  id
  email
  userName
}
    `;
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
    userName
    email
    id
    cardLibrary {
      id
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const CreateLobbyDocument = gql`
    mutation CreateLobby($creatorId: Float!) {
  createLobby(creatorId: $creatorId) {
    id
    members {
      id
      userName
    }
  }
}
    `;

export function useCreateLobbyMutation() {
  return Urql.useMutation<CreateLobbyMutation, CreateLobbyMutationVariables>(CreateLobbyDocument);
};
export const JoinLobbyDocument = gql`
    mutation JoinLobby($accountId: Float!, $joinLobbyId: String!) {
  joinLobby(accountId: $accountId, id: $joinLobbyId) {
    id
    members {
      id
      userName
    }
  }
}
    `;

export function useJoinLobbyMutation() {
  return Urql.useMutation<JoinLobbyMutation, JoinLobbyMutationVariables>(JoinLobbyDocument);
};
export const LeaveLobbyDocument = gql`
    mutation LeaveLobby($accountId: Float!, $leaveLobbyId: String!) {
  leaveLobby(accountId: $accountId, id: $leaveLobbyId) {
    id
    members {
      userName
    }
  }
}
    `;

export function useLeaveLobbyMutation() {
  return Urql.useMutation<LeaveLobbyMutation, LeaveLobbyMutationVariables>(LeaveLobbyDocument);
};
export const WatchLobbyDocument = gql`
    subscription WatchLobby($watchLobbyId: String!, $accountId: Float!) {
  watchLobby(id: $watchLobbyId, accountId: $accountId) {
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