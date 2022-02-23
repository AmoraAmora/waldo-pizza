import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum PizzaSizes {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

export type PizzaSize = {
  __typename: 'pizzaSize';
  /** Base price of the pie - sans toppings */
  basePrice: Scalars['Float'];
  /** Max number of allowable toppings. */
  maxToppings: Maybe<Scalars['Int']>;
  /** The size of the pizza */
  name: Scalars['String'];
  /** Toppings allowed on this pizza, and whether or not they're default selected */
  toppings: Array<Maybe<PizzaToppingConnection>>;
};

export type PizzaToppingConnection = {
  __typename: 'pizzaToppingConnection';
  /** whether or not this topping should be selected by default for this pizza */
  defaultSelected: Scalars['Boolean'];
  /** The pizza size */
  pizzaSize: PizzaSize;
  /** The topping */
  topping: Topping;
};

export type Query = {
  __typename: 'query';
  /** Pizza size by name */
  pizzaSizeByName: Maybe<PizzaSize>;
  /** All available pizza sizes */
  pizzaSizes: Array<Maybe<PizzaSize>>;
};


export type QueryPizzaSizeByNameArgs = {
  name: InputMaybe<PizzaSizes>;
};

export type Topping = {
  __typename: 'topping';
  /** The name of the topping */
  name: Scalars['String'];
  /** How much this topping costs */
  price: Scalars['Float'];
};

export type GetPizzaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPizzaQuery = { __typename: 'query', pizzaSizes: Array<{ __typename: 'pizzaSize', name: string, maxToppings: number | null, basePrice: number, toppings: Array<{ __typename: 'pizzaToppingConnection', defaultSelected: boolean, topping: { __typename: 'topping', name: string, price: number } } | null> } | null> };


export const GetPizzaDocument = gql`
    query getPizza {
  pizzaSizes {
    name
    maxToppings
    basePrice
    toppings {
      topping {
        name
        price
      }
      defaultSelected
    }
  }
}
    `

/**
 * __useGetPizzaQuery__
 *
 * To run a query within a React component, call `useGetPizzaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPizzaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPizzaQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPizzaQuery(baseOptions?: Apollo.QueryHookOptions<GetPizzaQuery, GetPizzaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPizzaQuery, GetPizzaQueryVariables>(GetPizzaDocument, options)
      }
export function useGetPizzaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPizzaQuery, GetPizzaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPizzaQuery, GetPizzaQueryVariables>(GetPizzaDocument, options)
        }
export type GetPizzaQueryHookResult = ReturnType<typeof useGetPizzaQuery>;
export type GetPizzaLazyQueryHookResult = ReturnType<typeof useGetPizzaLazyQuery>;
export type GetPizzaQueryResult = Apollo.QueryResult<GetPizzaQuery, GetPizzaQueryVariables>;