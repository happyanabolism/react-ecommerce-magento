import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  request,
  type RemoveProductsFromWishlistMutationVariables,
} from '@shared/api';
import { REMOVE_PRODUCTS_FROM_WISHLIST } from '../api/api';

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      variables: RemoveProductsFromWishlistMutationVariables
    ) => {
      const response = await request(REMOVE_PRODUCTS_FROM_WISHLIST, variables);
      const errors = (
        response.removeProductsFromWishlist?.user_errors ?? []
      ).filter((error) => error != null);

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
