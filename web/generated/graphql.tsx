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

export type Query = {
  __typename?: 'Query';
  accounts: Test;
};

export type Subscription = {
  __typename?: 'Subscription';
  accountAdded: Test;
};


export type SubscriptionAccountAddedArgs = {
  testing: Scalars['String'];
};

export type Test = {
  __typename?: 'Test';
  message?: Maybe<Scalars['String']>;
};

export type AccountAddedSubscriptionVariables = Exact<{
  testing: Scalars['String'];
}>;


export type AccountAddedSubscription = { __typename?: 'Subscription', accountAdded: { __typename?: 'Test', message?: string | null } };

export type AccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountsQuery = { __typename?: 'Query', accounts: { __typename?: 'Test', message?: string | null } };


export const AccountAddedDocument = gql`
    subscription AccountAdded($testing: String!) {
  accountAdded(testing: $testing) {
    message
  }
}
    `;

export function useAccountAddedSubscription<TData = AccountAddedSubscription>(options: Omit<Urql.UseSubscriptionArgs<AccountAddedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<AccountAddedSubscription, TData>) {
  return Urql.useSubscription<AccountAddedSubscription, TData, AccountAddedSubscriptionVariables>({ query: AccountAddedDocument, ...options }, handler);
};
export const AccountsDocument = gql`
    query Accounts {
  accounts {
    message
  }
}
    `;

export function useAccountsQuery(options?: Omit<Urql.UseQueryArgs<AccountsQueryVariables>, 'query'>) {
  return Urql.useQuery<AccountsQuery>({ query: AccountsDocument, ...options });
};