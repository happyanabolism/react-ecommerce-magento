import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories($filters: CategoryFilterInput!, $pageSize: Int!, $currentPage: Int!) {
    categories(
      filters: $filters
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        id
        uid
        name
        product_count
        url_key
        url_path
      }
      page_info {
        total_pages
      }
    }
  }
`;

export const GET_CATEGORIES_WITH_PRODUCTS = gql`
  query getCategories($filters: CategoryFilterInput!, $pageSize: Int!, $currentPage: Int!) {
    categories(
      filters: $filters
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        id
        uid
        name
        product_count
        url_key
        url_path
        products(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            id
            name
            small_image {
              url
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
      page_info {
        total_pages
      }
    }
  }
`;