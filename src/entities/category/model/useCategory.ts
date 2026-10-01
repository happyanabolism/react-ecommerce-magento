import { useQuery } from '@apollo/client/react';
import { CATEGORY_PAGE } from '../api/categoryApi';
import type { CategoryPageQueryVariables } from '@shared/api/gql/graphql';

export const useCategory = ({ urlPath }: CategoryPageQueryVariables) => {
  const { data, ...rest } = useQuery(CATEGORY_PAGE, {
    variables: {
      urlPath,
    },
  });

  return { category: data?.categories?.items?.[0] || null, ...rest };
};
