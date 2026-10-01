import { useQuery } from '@apollo/client/react';
import { CATEGORY_MENU } from '../api/categoryApi';
import type {
  CategoryMenuItemFragment,
  CategoryMenuQuery,
  CategoryMenuQueryVariables,
} from '@shared/api/gql/graphql';

interface UseCategorieMenuResult extends Omit<
  ReturnType<typeof useQuery<CategoryMenuQuery, CategoryMenuQueryVariables>>,
  'data'
> {
  categories: CategoryMenuItemFragment[];
}

export const useCategoryMenu = ({
  rootUid,
}: Partial<CategoryMenuQueryVariables>): UseCategorieMenuResult => {
  const { data, ...rest } = useQuery(CATEGORY_MENU, {
    variables: { rootUid: rootUid ?? '' },
    skip: !rootUid,
  });

  const children = data?.categories?.items?.[0]?.children ?? [];

  return {
    categories: children.filter((item) => item !== null),
    ...rest,
  };
};
