import { graphql } from './gql';

export const MONEY = graphql(`
  fragment Money on Money {
    value
    currency
  }
`);
