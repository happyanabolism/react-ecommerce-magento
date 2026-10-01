import { graphql } from '@shared/api/gql';

export const CATEGORY_PAGE_FIELDS = graphql(`
  fragment CategoryPageFields on CategoryTree {
    uid
    name
    description
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
