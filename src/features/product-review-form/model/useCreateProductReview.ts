import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  request,
  type CreateProductReviewMutationVariables,
} from '@shared/api';
import { CREATE_PRODUCT_REVIEW } from '../api/api';

export const useCreateProductReview = () => {
  return useMutation({
    mutationFn: (variables: CreateProductReviewMutationVariables) => {
      return request(CREATE_PRODUCT_REVIEW, variables);
    },
    onSuccess: () => {
      toast.success('Your review successfully created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
