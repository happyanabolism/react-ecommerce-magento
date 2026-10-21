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
    id
    quantity
    product {
      ...ProductCardFields
    }
  }
`);
