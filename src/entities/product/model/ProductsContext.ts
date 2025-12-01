import { createContext } from 'react';
import { type SetURLSearchParams } from 'react-router';
import { useQuery } from '@apollo/client/react';
import type { Products, ProductQuery, ProductQueryVars } from './types';

export type ProductsContextValue = Products &
  Omit<ReturnType<typeof useQuery<ProductQuery, ProductQueryVars>>, 'data'> & {
    setSearchParams: SetURLSearchParams;
  };

export const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
);
