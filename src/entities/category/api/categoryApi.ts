import { gql } from '@apollo/client';
import { graphql } from '@shared/api/gql';

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

export const CATEGORY_MENU = graphql(`
  query categoryMenu($rootUid: String!) {
    categories(filters: { category_uid: { eq: $rootUid } }) {
      items {
        uid
        children {
          ...CategoryMenuItem
        }
      }
    }
  }
`);

export const CATEGORY_MENU_ITEM = graphql(`
  fragment CategoryMenuItem on CategoryTree {
    uid
    name
    url_path
    include_in_menu
    position
  }
`);
