import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories(
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
