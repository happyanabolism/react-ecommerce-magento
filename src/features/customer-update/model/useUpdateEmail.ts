import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { UPDATE_CUSTOMER_EMAIL } from '../api/customerUpdateApi';
import type { UpdateCustomerEmailMutationVariables } from '@shared/api';

export const useUpdateEmail = () => {
  const [updateEmail, result] = useMutation(UPDATE_CUSTOMER_EMAIL);

  const updateCustomerEmail = async (
    variables: UpdateCustomerEmailMutationVariables
  ) => {
    try {
      await updateEmail({ variables });
      toast.success('Customer email updated');
      return true;
    } catch {
      // error will arrive in result.error
      return false;
    }
  };

  return [updateCustomerEmail, result] as const;
};
