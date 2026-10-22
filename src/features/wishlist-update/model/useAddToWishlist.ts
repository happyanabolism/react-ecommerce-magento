import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  request,
  type AddProductsToWishlistMutationVariables,
} from '@shared/api';
import { ADD_PRODUCTS_TO_WISHLIST } from '../api/api';

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: AddProductsToWishlistMutationVariables) => {
      const response = await request(ADD_PRODUCTS_TO_WISHLIST, variables);
      const errors = (response.addProductsToWishlist?.user_errors ?? []).filter(
        (error) => error != null
      );

      if (errors.length > 0) {
        throw new Error(errors.map((error) => error.message).join(' '));
      }

      return response;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['customer', 'wishlist'] }),
    onError: (error) => toast.error(error.message),
  });
};
