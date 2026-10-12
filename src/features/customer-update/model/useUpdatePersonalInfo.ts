import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UPDATE_PERSONAL_INFO } from '../api/customerUpdateApi';
import { request, type CustomerUpdateInput } from '@shared/api';

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CustomerUpdateInput) =>
      request(UPDATE_PERSONAL_INFO, { input }),
    onSuccess: () => {
      toast.success('Personal data updated');
      return queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
  });
};
