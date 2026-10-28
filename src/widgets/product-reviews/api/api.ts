import { graphql } from '@shared/api';

export const PRODUCT_REVIEWS = graphql(`
  query productReviews($sku: String!, $pageSize: Int!, $currentPage: Int!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        rating_summary
        review_count
        reviews(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            average_rating
            created_at
            nickname
            summary
            text
          }
          page_info {
            current_page
            total_pages
          }
        }
      }
    }
  }
`);
