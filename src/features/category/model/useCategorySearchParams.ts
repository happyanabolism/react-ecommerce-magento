import type { ProductQueryVars } from '@entities/product';
import { useSearchParams } from 'react-router';

export const useCategorySearchParams = (): [
  ProductQueryVars,
  (filters: Partial<ProductQueryVars>) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductQueryVars = {
    currentPage: parseInt(searchParams.get('page') ?? '1'),
  };
  const setFilters = (filters: Partial<ProductQueryVars>): void => {
    const filterParams: Record<string, string> = {};

    if (filters.currentPage) {
      filterParams.page = filters.currentPage.toString();
    }

    setSearchParams({ ...filterParams });
  };

  return [filters, setFilters];
};
