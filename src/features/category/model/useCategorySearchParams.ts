import { useSearchParams } from 'react-router';
import type { FlatProductQueryVars } from '@entities/product';

const SYSTEM_KEYS = ['page', 'pageSize', 'search', 'sort', 'direction'];

export const useCategorySearchParams = (): [
  FlatProductQueryVars,
  (filters: Partial<FlatProductQueryVars>) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FlatProductQueryVars = {
    currentPage: Number(searchParams.get('page') ?? 1),
    pageSize: searchParams.get('pageSize')
      ? Number(searchParams.get('pageSize'))
      : undefined,
    search: searchParams.get('search') ?? undefined,
  };

  const sortField = searchParams.get('sort');
  const sortDirection = searchParams.get('direction');

  if (sortField) {
    filters.sort = {
      [sortField]: sortDirection,
    };
  }

  searchParams.forEach((value, key) => {
    if (!SYSTEM_KEYS.includes(key)) {
      if (!filters.filter) {
        filters.filter = {};
      }
      if (!filters.filter[key]) {
        filters.filter[key] = [];
      }
      filters.filter[key] = value.split(',');
    }
  });

  const setFilters = (nextFilters: Partial<FlatProductQueryVars>): void => {
    const params = new URLSearchParams();

    const combinedFilters: Record<string, string[]> = { ...filters.filter };

    if (nextFilters.filter) {
      Object.entries(nextFilters.filter).forEach(([key, value]) => {
        const current = combinedFilters[key] ?? [];
        combinedFilters[key] = [
          ...current,
          ...value.filter((v) => !current.includes(v)),
        ];
      });
    }

    if (nextFilters.currentPage) {
      params.set('page', nextFilters.currentPage.toString());
    }

    if (nextFilters.pageSize) {
      params.set('pageSize', nextFilters.pageSize.toString());
    }

    if (nextFilters.search) {
      params.set('search', nextFilters.search);
    }

    Object.entries(combinedFilters).forEach(([key, value]) => {
      if (value.length) params.set(key, value.join(','));
      else params.delete(key);
    });

    setSearchParams(params);
  };

  return [filters, setFilters];
};
