import { graphql } from '@shared/api';

const PRODUCT_WITH_OPTIONS_FRAGMENT = graphql(`
  fragment ProductWithOptions on ProductInterface {
    __typename
    ...ProductDetails
    ... on ConfigurableProduct {
      ...ConfigurableProduct
    }
  }
`);
