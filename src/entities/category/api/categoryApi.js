import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories(
    $filters: CategoryFilterInput!
    $pageSize: Int!
    $currentPage: Int!
    $withProducts: Boolean! = false
  ) {
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
        relative_url
        path_in_store
        path
        canonical_url
        level
        is_anchor
        include_in_menu
        children {
          id
          name
          url_path
        }
        products(pageSize: $pageSize, currentPage: $currentPage)
          @include(if: $withProducts) {
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
