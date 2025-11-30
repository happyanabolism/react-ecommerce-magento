import { gql } from '@apollo/client';

export const PRODUCTS = gql`
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
        uid
        name
        sku
        small_image {
          url
        }
        custom_attributesV2 {
          items {
            code
            ... on AttributeValue {
              value
            }
            ... on AttributeSelectedOptions {
              selected_options {
                label
                value
              }
            }
          }
        }
        price_range {
          minimum_price {
            regular_price {
              currency
              value
            }
            final_price {
              currency
              value
            }
          }
          maximum_price {
            regular_price {
              currency
              value
            }
            final_price {
              currency
              value
            }
          }
        }
      }
      page_info {
        total_pages
        current_page
      }
    }
  }
`;

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
