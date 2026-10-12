import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CHANGE_CUSTOMER_PASSWORD } from '../api/customerUpdateApi';
import {
  request,
  type ChangeCustomerPasswordMutationVariables,
} from '@shared/api';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (variables: ChangeCustomerPasswordMutationVariables) =>
      request(CHANGE_CUSTOMER_PASSWORD, variables),
    onSuccess: () => {
      toast.success('Customer password updated');
    },
  });
};
