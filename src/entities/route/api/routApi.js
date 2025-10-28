import { gql } from '@apollo/client';

export const URL_RESOLVER = gql`
  query route($url: String!) {
    route(url: $url) {
      redirect_code
      relative_url
      type
    }
  }
`;
