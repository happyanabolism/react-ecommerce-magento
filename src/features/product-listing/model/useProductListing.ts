import { useSearchParams } from 'react-router';
import { useProducts } from '@entities/product';
import type { ProductAttributeFilterInput } from '@shared/api';

export interface ProductListingCriteria {
  filter?: ProductAttributeFilterInput;
  search?: string;
}

export const useProductListing = ({
  filter,
  search,
}: ProductListingCriteria) => {
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1');

  const listing = useProducts({
    filter,
    search,
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
