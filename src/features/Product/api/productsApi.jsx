import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_PRODUCTS = gql`
  query getProducts($filter: ProductAttributeFilterInput!, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        id
        small_image {
          url
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

export const useProductsQuery = ({ filter, pageSize, currentPage }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: filter,
      pageSize: pageSize,
      currentPage: currentPage
    }
  });

  return { data, loading, error};
};
