import { graphql } from '@shared/api';

export const PRODUCTS = graphql(`
  query products(
    $filter: ProductAttributeFilterInput
    $pageSize: Int
    $currentPage: Int
  ) {
    products(filter: $filter, pageSize: $pageSize, currentPage: $currentPage) {
      aggregations {
        attribute_code
        count
        label
        options {
          count
          label
          value
        }
        position
      }
      items {
        ...productCardFields
      }
      page_info {
        total_pages
        current_page
      }
    }
  }
`);

export const PRODUCT_CART_FIELDS = graphql(`
  fragment productCardFields on ProductInterface {
    uid
    name
    sku
    url_key
    image {
      url
    }
    price_range {
      ...ProductPriceRange
    }
  }
`);

export const PRODUCT_PRICE_RANGE = graphql(`
  fragment ProductPriceRange on PriceRange {
    minimum_price {
      regular_price {
        ...Money
      }
      final_price {
        ...Money
      }
    }
    maximum_price {
      regular_price {
        ...Money
      }
      final_price {
        ...Money
      }
    }
  }
`);

// export const GET_PRODUCT_ATTRIBUTES_LIST = gql`
//   query attributesList(
//     $entityType: AttributeEntityTypeEnum = CATALOG_PRODUCT
//     $filters: AttributeFilterInput
//   ) {
//     attributesList(entityType: $entityType, filters: $filters) {
//       items {
//         code
//         label
//         default_value
//         entity_type
//         frontend_class
//         frontend_input
//         is_required
//         is_unique
//         options {
//           label
//           value
//           is_default
//         }
//       }
//     }
//   }
// `;
