import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { PRODUCT_LISTING } from '@entities/product';
import { request, type ProductListingQuery } from '@shared/api';
import { selectRecentlyViewedSkus } from './selectors';

const selectProducts = (data: ProductListingQuery) =>
  (data.products?.items || []).filter((product) => product !== null);

export const useRecentlyViewedProducts = () => {
  const viewedSkus = useSelector(selectRecentlyViewedSkus);
  const filter = { sku: { in: viewedSkus } };

  return useQuery({
    queryKey: ['product', 'listing', viewedSkus],
    queryFn: () => request(PRODUCT_LISTING, { filter }),
    enabled: viewedSkus.length > 0,
    select: selectProducts,
  });
};
