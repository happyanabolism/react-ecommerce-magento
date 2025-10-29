import { gql } from '@apollo/client';

export const ROUTE = gql`
  query route($url: String!) {
    route(url: $url) {
      redirect_code
      relative_url
      type
    }
  }
`;
