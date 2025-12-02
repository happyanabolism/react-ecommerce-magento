import { createContext } from 'react';
import { useQuery } from '@apollo/client/react';
import type {
  Products,
  ProductQuery,
  ProductQueryVars,
} from '@entities/product';

export type CategoryProductsContextValue = Products &
  Pick<
    ReturnType<typeof useQuery<ProductQuery, ProductQueryVars>>,
    'loading' | 'error'
  > & {
    setFilters: (filters: Partial<ProductQueryVars>) => void;
  };

const defaultProducts: CategoryProductsContextValue = {
  aggregations: [],
  items: [],
  page_info: {},
  loading: true,
  setFilters: () => {},
};

export const CategoryProductsContext =
  createContext<CategoryProductsContextValue>(defaultProducts);
