import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories(
    $filters: CategoryFilterInput!
    $pageSize: Int!
    $currentPage: Int!
    $includeProducts: Boolean! = false
  ) {
    categories(
      filters: $filters
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        uid
        name
        url_path
        include_in_menu
        children {
          uid
          name
          url_path
          include_in_menu
        }
        products(pageSize: $pageSize, currentPage: $currentPage)
          @include(if: $includeProducts) {
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
