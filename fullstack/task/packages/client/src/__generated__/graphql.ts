/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateExampleInputType = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Example = {
  __typename?: 'Example';
  createdAtUtc: Scalars['DateTime']['output'];
  deleteDateUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAtUtc?: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  amount: Scalars['Float']['output'];
  country: Scalars['String']['output'];
  createdAtUtc: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  currencyCode: Scalars['String']['output'];
  deleteDateUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  order: Scalars['Float']['output'];
  rate: Scalars['Float']['output'];
  updatedAtUtc?: Maybe<Scalars['DateTime']['output']>;
  validFor: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExample: Example;
};


export type MutationCreateExampleArgs = {
  data: CreateExampleInputType;
};

export type Query = {
  __typename?: 'Query';
  exampleByName?: Maybe<Example>;
  exchangeRates?: Maybe<Array<ExchangeRate>>;
};


export type QueryExampleByNameArgs = {
  name: Scalars['String']['input'];
};

export type GetExchangeRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExchangeRatesQuery = { __typename?: 'Query', exchangeRates?: Array<{ __typename?: 'ExchangeRate', createdAtUtc: any, validFor: string, order: number, country: string, currency: string, amount: number, currencyCode: string, rate: number }> | null };


export const GetExchangeRatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExchangeRates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangeRates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAtUtc"}},{"kind":"Field","name":{"kind":"Name","value":"validFor"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]}}]} as unknown as DocumentNode<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>;