import { graphql } from '@shared/api';

export const PRODUCT_PAGE = graphql(`
  query productPage($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        uid
        name
        sku
        description {
          html
        }
        image {
          url
          label
        }
        price_range {
          ...ProductPriceRange
        }
      }
    }
  }
`);
