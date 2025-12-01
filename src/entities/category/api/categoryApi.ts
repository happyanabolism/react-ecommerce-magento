import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query categories(
    $filters: CategoryFilterInput!
    $pageSize: Int!
    $currentPage: Int!
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
        default_sort_by
        children {
          uid
          name
          url_path
          include_in_menu
        }
      }
      page_info {
        total_pages
      }
    }
  }
`;
