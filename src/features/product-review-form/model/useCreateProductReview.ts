import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  request,
  type CreateProductReviewMutationVariables,
} from '@shared/api';
import { CREATE_PRODUCT_REVIEW } from '../api/api';
import type { CreateProductReviewFormData } from './createProductReview.schema';

export const useCreateProductReview = (sku: string) => {
  return useMutation({
    mutationFn: (data: CreateProductReviewFormData) => {
      const variables = {
        input: {
          ...data,
          sku,
          ratings: Object.entries(data.ratings).map(([ratingId, valueId]) => ({
            id: ratingId,
            value_id: valueId,
          })),
        },
      };
      return request(CREATE_PRODUCT_REVIEW, variables);
    },
    onSuccess: () => {
      toast.success('Your review has been submitted for moderation');
    },
  });
};
