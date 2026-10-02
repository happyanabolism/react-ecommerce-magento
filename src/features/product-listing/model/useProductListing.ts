import { useSearchParams } from 'react-router';
import { useProducts } from '@entities/product';
import type { ProductAttributeFilterInput } from '@shared/api/gql/graphql';

export interface ProductListingCriteria {
  filter: ProductAttributeFilterInput;
}

export const useProductListing = ({ filter }: ProductListingCriteria) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const setPage = (page: number) => {
    setSearchParams((params) => {
      params.set('page', String(page));
      return params;
    });
  };

  const listing = useProducts({
    filter,
    currentPage,
  });

  return { ...listing, setPage };
};
