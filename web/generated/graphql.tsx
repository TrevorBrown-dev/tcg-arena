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
  email: Scalars['String'];
  id: Scalars['Float'];
  userName: Scalars['String'];
};

export type AccountResponse = {
  __typename?: 'AccountResponse';
  account?: Maybe<Account>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Float'];
  player1?: Maybe<Account>;
  player1Health: Scalars['Float'];
  player2?: Maybe<Account>;
  player2Health: Scalars['Float'];
};

export type GameInput = {
  player1Health: Scalars['Float'];
  player2Health: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  register: AccountResponse;
  updateGame: Game;
};


export type MutationCreateGameArgs = {
  player1: Scalars['Float'];
  player2: Scalars['Float'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateGameArgs = {
  data: GameInput;
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  game: Game;
};


export type QueryAccountArgs = {
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
  watchGame: Game;
};


export type SubscriptionWatchGameArgs = {
  gameId: Scalars['Float'];
};

export type AccountPartsFragment = { __typename?: 'Account', id: number, email: string, userName: string };

export type CreateGameMutationVariables = Exact<{
  player1: Scalars['Float'];
  player2: Scalars['Float'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: number, player1Health: number, player2Health: number } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AccountResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, account?: { __typename?: 'Account', id: number, email: string, userName: string } | null } };

export type UpdateGameMutationVariables = Exact<{
  id: Scalars['Float'];
  data: GameInput;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', updateGame: { __typename?: 'Game', player1Health: number, player2Health: number, player1?: { __typename?: 'Account', id: number, email: string, userName: string } | null, player2?: { __typename?: 'Account', id: number, email: string, userName: string } | null } };

export type AccountQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type AccountQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: number, email: string, userName: string } };

export type GameQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: number, player1Health: number, player2Health: number } };

export type WatchGameSubscriptionVariables = Exact<{
  gameId: Scalars['Float'];
}>;


export type WatchGameSubscription = { __typename?: 'Subscription', watchGame: { __typename?: 'Game', player1Health: number, player2Health: number, player1?: { __typename?: 'Account', id: number, email: string, userName: string } | null, player2?: { __typename?: 'Account', id: number, email: string, userName: string } | null } };

export const AccountPartsFragmentDoc = gql`
    fragment AccountParts on Account {
  id
  email
  userName
}
    `;
export const CreateGameDocument = gql`
    mutation CreateGame($player1: Float!, $player2: Float!) {
  createGame(player1: $player1, player2: $player2) {
    id
    player1Health
    player2Health
  }
}
    `;

export function useCreateGameMutation() {
  return Urql.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument);
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
export const UpdateGameDocument = gql`
    mutation UpdateGame($id: Float!, $data: GameInput!) {
  updateGame(id: $id, data: $data) {
    player1 {
      ...AccountParts
    }
    player2 {
      ...AccountParts
    }
    player1Health
    player2Health
  }
}
    ${AccountPartsFragmentDoc}`;

export function useUpdateGameMutation() {
  return Urql.useMutation<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument);
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
export const GameDocument = gql`
    query Game($id: Float!) {
  game(id: $id) {
    id
    player1Health
    player2Health
  }
}
    `;

export function useGameQuery(options: Omit<Urql.UseQueryArgs<GameQueryVariables>, 'query'>) {
  return Urql.useQuery<GameQuery>({ query: GameDocument, ...options });
};
export const WatchGameDocument = gql`
    subscription WatchGame($gameId: Float!) {
  watchGame(gameId: $gameId) {
    player1 {
      ...AccountParts
    }
    player2 {
      ...AccountParts
    }
    player1Health
    player2Health
  }
}
    ${AccountPartsFragmentDoc}`;

export function useWatchGameSubscription<TData = WatchGameSubscription>(options: Omit<Urql.UseSubscriptionArgs<WatchGameSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<WatchGameSubscription, TData>) {
  return Urql.useSubscription<WatchGameSubscription, TData, WatchGameSubscriptionVariables>({ query: WatchGameDocument, ...options }, handler);
};