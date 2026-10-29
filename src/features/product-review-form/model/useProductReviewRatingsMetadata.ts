import { useQuery } from '@tanstack/react-query';
import { request, type ProductReviewRatingsMetadataQuery } from '@shared/api';
import { PRODUCT_REVIEW_RATINGS_METADATA } from '../api/api';

const selectRatings = (data: ProductReviewRatingsMetadataQuery) => {
  return data.productReviewRatingsMetadata.items.filter((item) => item != null);
};

export const useProductReviewRatingsMetadata = () => {
  return useQuery({
    queryKey: ['review', 'ratings'],
    queryFn: () => request(PRODUCT_REVIEW_RATINGS_METADATA),
    select: selectRatings,
  });
};
