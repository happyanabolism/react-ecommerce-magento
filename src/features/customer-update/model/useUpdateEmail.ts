import { useMutation } from '@apollo/client/react';
import { UPDATE_CUSTOMER_EMAIL } from '../api/customerUpdateApi';
import { addNotification } from '@entities/notification';
import type { UpdateCustomerEmailMutationVariables } from '@shared/api';
import { useAppDispatch } from '@shared/lib';

export const useUpdateEmail = () => {
  const [updateEmail, result] = useMutation(UPDATE_CUSTOMER_EMAIL);
  const dispatch = useAppDispatch();

  const updateCustomerEmail = async (
    variables: UpdateCustomerEmailMutationVariables
  ) => {
    try {
      await updateEmail({ variables });
      dispatch(
        addNotification({ type: 'success', message: 'Customer email updated' })
      );
      return true;
    } catch {
      // error will arrive in result.error
      return false;
    }
  };

  return [updateCustomerEmail, result] as const;
};
