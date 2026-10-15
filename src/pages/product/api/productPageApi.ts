import { graphql } from '@shared/api';

export const PRODUCT_PAGE = graphql(`
  query productPage($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...ProductWithOptions
      }
    }
  }
`);
