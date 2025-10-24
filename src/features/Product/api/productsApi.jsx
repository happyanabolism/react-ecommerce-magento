import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts($filter: ProductAttributeFilterInput!, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        id
        small_image {
          url
        }
        name
        sku
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
      }
      page_info {
        total_pages
      }
    }
  }
`;
