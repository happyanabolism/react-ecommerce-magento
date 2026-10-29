import { graphql } from '@shared/api';

export const CREATE_PRODUCT_REVIEW = graphql(`
  mutation createProductReview($input: CreateProductReviewInput!) {
    createProductReview(input: $input) {
      review {
        nickname
      }
    }
  }
`);

export const PRODUCT_REVIEW_RATINGS_METADATA = graphql(`
  query productReviewRatingsMetadata {
    productReviewRatingsMetadata {
      items {
        id
        name
        values {
          value_id
          value
        }
      }
    }
  }
`);
