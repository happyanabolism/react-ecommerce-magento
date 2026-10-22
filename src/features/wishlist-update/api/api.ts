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

export const ADD_PRODUCTS_TO_WISHLIST = graphql(`
  mutation addProductsToWishlist(
    $wishlistId: ID!
    $wishlistItems: [WishlistItemInput!]!
  ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: $wishlistItems
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
