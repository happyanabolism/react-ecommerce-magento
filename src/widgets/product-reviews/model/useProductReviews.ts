import {
  request,
  type ProductReviewsQuery,
  type ProductReviewsQueryVariables,
} from '@shared/api';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { PRODUCT_REVIEWS } from '../api/api';

const selectProductReviews = (data: InfiniteData<ProductReviewsQuery>) => {
  const product = data.pages[0]?.products?.items?.[0];

  return {
    reviews: data.pages
      .flatMap((page) => page.products?.items?.[0]?.reviews.items ?? [])
      .filter((item) => item != null),
    reviewCount: product?.review_count ?? 0,
    ratingSummary: product?.rating_summary ?? 0,
    loadedPageCount: data.pages.length,
  };
};

export const useProductReviews = (
  variables: Omit<ProductReviewsQueryVariables, 'currentPage'>
) => {
  return useInfiniteQuery({
    queryKey: ['product', 'reviews', variables],
    queryFn: ({ pageParam }) =>
      request(PRODUCT_REVIEWS, { ...variables, currentPage: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.products?.items?.[0]?.reviews.page_info;

      if (pageInfo?.current_page == null || pageInfo.total_pages == null)
        return undefined;

      if (pageInfo.current_page < pageInfo.total_pages) {
        return pageInfo.current_page + 1;
      }

      return undefined;
    },
    select: selectProductReviews,
  });
};
