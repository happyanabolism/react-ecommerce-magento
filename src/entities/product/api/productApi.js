import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query products(
    $filter: ProductAttributeFilterInput!
    $pageSize: Int!
    $currentPage: Int!
  ) {
    products(filter: $filter, pageSize: $pageSize, currentPage: $currentPage) {
      items {
        id
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
        name
        sku
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
      }
      page_info {
        total_pages
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
