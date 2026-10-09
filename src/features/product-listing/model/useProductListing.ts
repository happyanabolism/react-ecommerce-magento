import { useSearchParams } from 'react-router';
import { useProducts } from '@entities/product';
import type { ProductAttributeFilterInput } from '@shared/api';

export interface ProductListingCriteria {
  filter: ProductAttributeFilterInput;
}

export const useProductListing = ({ filter }: ProductListingCriteria) => {
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1');

  const listing = useProducts({
    filter,
    currentPage,
  });

  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    return '?' + params.toString();
  };

  return { ...listing, currentPage, getPageHref };
};
