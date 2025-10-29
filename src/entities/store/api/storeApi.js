import { gql } from '@apollo/client';

export const STORE_CONFIG = gql`
  query storeConfig {
    storeConfig {
      root_category_id
    }
  }
`;
