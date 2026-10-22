import { graphql } from '@shared/api';

export const REMOVE_PRODUCTS_FROM_WISHLIST = graphql(`
  mutation removeProductsFromWishlist(
    $wishlistId: ID!
    $wishlistItemsIds: [ID!]!
  ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      user_errors {
        code
        message
      }
      wishlist {
        ...Wishlist
      }
    }
  }
`);
