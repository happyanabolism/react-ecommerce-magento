import { graphql } from '@shared/api';

export const ROUTE = graphql(`
  query route($url: String!) {
    route(url: $url) {
      __typename
      redirect_code
      relative_url
      type
      ...CategoryPageFields
      ... on ProductInterface {
        uid
        url_key
        sku
      }
    }
  }
`);
