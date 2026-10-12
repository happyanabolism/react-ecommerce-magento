import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { REVOKE_CUSTOMER_TOKEN } from '../api/logoutApi';
import { logout as clearSession } from '@entities/session';
import { useAppDispatch } from '@shared/lib';
import { request } from '@shared/api';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => request(REVOKE_CUSTOMER_TOKEN),
    onSettled: () => {
      dispatch(clearSession());
      queryClient.clear();
      toast.info('You have been logged out');
    },
  });
};
