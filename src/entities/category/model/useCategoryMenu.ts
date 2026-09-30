import { useQuery } from '@apollo/client/react';
import { CATEGORY_MENU } from '../api/categoryApi';
import type {
  CategoryMenuItem,
  CategoryMenuQuery,
  CategoryMenuQueryVars,
} from './types';

interface UseCategorieMenuResult
  extends Omit<
    ReturnType<typeof useQuery<CategoryMenuQuery, CategoryMenuQueryVars>>,
    'data'
  > {
  categories: CategoryMenuItem[];
}

export const useCategoryMenu = ({
  rootUid,
}: CategoryMenuQueryVars): UseCategorieMenuResult => {
  const { data, ...rest } = useQuery<CategoryMenuQuery, CategoryMenuQueryVars>(
    CATEGORY_MENU,
    { variables: { rootUid: rootUid ?? '' }, skip: !rootUid }
  );

  return {
    categories: data?.categories?.items[0]?.children ?? [],
    ...rest,
  };
};
