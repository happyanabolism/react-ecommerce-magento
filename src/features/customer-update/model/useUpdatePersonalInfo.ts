import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { UPDATE_PERSONAL_INFO } from '../api/customerUpdateApi';
import type { CustomerUpdateInput } from '@shared/api';

export const useUpdatePersonalInfo = () => {
  const [updatePersonalInfo, result] = useMutation(UPDATE_PERSONAL_INFO);

  const updateCustomer = async (input: CustomerUpdateInput) => {
    try {
      await updatePersonalInfo({ variables: { input } });
      toast.success('Personal data updated');
      return true;
    } catch {
      // error will arrive in result.error
      return false;
    }
  };

  return [updateCustomer, result] as const;
};
