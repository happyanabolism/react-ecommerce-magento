import { graphql } from '@shared/api';

// everything ProductDetails and its children need
const PRODUCT_PAGE_PRODUCT_FRAGMENT = graphql(`
  fragment ProductPageProduct on ProductInterface {
    ...ProductDetails
    ...ProductWithOptions
    ...AddToCartProduct
  }
`);

export const PRODUCT_PAGE = graphql(`
  query productPage($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...ProductPageProduct
      }
    }
  }
`);
