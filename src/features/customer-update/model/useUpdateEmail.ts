import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UPDATE_CUSTOMER_EMAIL } from '../api/customerUpdateApi';
import {
  request,
  type UpdateCustomerEmailMutationVariables,
} from '@shared/api';

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateCustomerEmailMutationVariables) =>
      request(UPDATE_CUSTOMER_EMAIL, variables),
    onSuccess: () => {
      toast.success('Customer email updated');
      return queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
};
