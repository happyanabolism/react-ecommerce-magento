import { graphql } from '@shared/api/gql';

export const CATEGORY_PAGE = graphql(`
  query categoryPage($urlPath: String!) {
    categories(filters: { url_path: { eq: $urlPath } }) {
      items {
        uid
        name
        description
      }
    }
  }
`);

export const CATEGORY_MENU = graphql(`
  query categoryMenu {
    categories {
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
