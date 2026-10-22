import { graphql } from '@shared/api';

export const WISHLIST_PAGE = graphql(`
  query wishlistPage {
    customer {
      wishlists {
        id
        items_v2 {
          items {
            ...WishlistItem
          }
        }
      }
    }
  }
`);

const WISHLIST_ITEM = graphql(`
  fragment WishlistItem on WishlistItemInterface {
    __typename
    id
    quantity
    product {
      ...ProductCardFields
    }
    ... on ConfigurableWishlistItem {
      configurable_options {
        configurable_product_option_uid
        option_label
        value_label
      }
    }
  }
`);
