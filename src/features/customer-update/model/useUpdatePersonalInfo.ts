import { useMutation } from '@apollo/client/react';
import { UPDATE_PERSONAL_INFO } from '../api/customerUpdateApi';
import type { CustomerUpdateInput } from '@shared/api';
import { useAppDispatch } from '@shared/lib';
import { addNotification } from '@entities/notification';

export const useUpdatePersonalInfo = () => {
  const [updatePersonalInfo, result] = useMutation(UPDATE_PERSONAL_INFO);
  const dispatch = useAppDispatch();

  const updateCustomer = async (input: CustomerUpdateInput) => {
    try {
      await updatePersonalInfo({ variables: { input } });
      dispatch(
        addNotification({ type: 'success', message: 'Personal data updated' })
      );
      return true;
    } catch {
      // error will arrive in result.error
      return false;
    }
  };

  return [updateCustomer, result] as const;
};
