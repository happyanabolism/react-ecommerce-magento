import { graphql } from '@shared/api';

export const WISHLIST = graphql(`
  query wishlist {
    customer {
      wishlists {
        ...Wishlist
      }
    }
  }
`);

const WISHLIST_FIELDS = graphql(`
  fragment Wishlist on Wishlist {
    id
    items_count
    items_v2 {
      items {
        __typename
        id
        product {
          sku
        }
        ... on ConfigurableWishlistItem {
          configured_variant {
            sku
          }
        }
      }
    }
  }
`);
