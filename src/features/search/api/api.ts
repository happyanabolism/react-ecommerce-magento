import { graphql } from '@shared/api';

export const PRODUCT_SEARCH = graphql(`
  query productSearch($search: String, $pageSize: Int) {
    products(search: $search, pageSize: $pageSize) {
      items {
        ...ProductCardFields
      }
      suggestions {
        ...SearchSuggestion
      }
      total_count
    }
  }
`);

const SEARCH_SUGGESTION_FRAGMENT = graphql(`
  fragment SearchSuggestion on SearchSuggestion {
    search
  }
`);
