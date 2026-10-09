import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CHANGE_CUSTOMER_PASSWORD } from '../api/customerUpdateApi';
import type { ChangeCustomerPasswordMutationVariables } from '@shared/api';

export const useUpdatePassword = () => {
  const [changePassword, result] = useMutation(CHANGE_CUSTOMER_PASSWORD);

  const changeCustomerPassword = async (
    variables: ChangeCustomerPasswordMutationVariables
  ) => {
    try {
      await changePassword({ variables });
      toast.success('Customer password updated');
      return true;
    } catch {
      // error will arrive in result.error
      return false;
    }
  };
  return [changeCustomerPassword, result] as const;
};
