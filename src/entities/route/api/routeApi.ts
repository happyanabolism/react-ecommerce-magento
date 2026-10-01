import { graphql } from '@shared/api/gql';

export const ROUTE = graphql(`
  query route($url: String!) {
    route(url: $url) {
      redirect_code
      relative_url
      type
      ... on CategoryTree {
        uid
      }
    }
  }
`);
