import { useMutation } from '@apollo/client/react';
import { CHANGE_CUSTOMER_PASSWORD } from '../api/customerUpdateApi';
import { addNotification } from '@entities/notification';
import type { ChangeCustomerPasswordMutationVariables } from '@shared/api';
import { useAppDispatch } from '@shared/lib';

export const useCustomerPasswordUpdate = () => {
  const [changePassword, result] = useMutation(CHANGE_CUSTOMER_PASSWORD);
  const dispatch = useAppDispatch();

  const changeCustomerPassword = async (
    variables: ChangeCustomerPasswordMutationVariables
  ) => {
    try {
      await changePassword({ variables });
      dispatch(
        addNotification({
          type: 'success',
          message: 'Customer password updated',
        })
      );
    } catch {
      // error will arrive in result.error
    }
  };
  return [changeCustomerPassword, result] as const;
};
