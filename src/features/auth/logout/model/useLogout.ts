import { useApolloClient, useMutation } from '@apollo/client/react';
import { REVOKE_CUSTOMER_TOKEN } from '../api/logoutApi';
import { logout as clearSession } from '@entities/session';
import { useAppDispatch } from '@shared/lib';

export const useLogout = () => {
  const [revokeCustomerToken, { loading }] = useMutation(REVOKE_CUSTOMER_TOKEN);
  const dispatch = useAppDispatch();
  const client = useApolloClient();

  const logout = async () => {
    try {
      await revokeCustomerToken();
    } catch {
      // error will arrive in result.error
    }

    dispatch(clearSession());
    await client.clearStore();
  };

  return [logout, { loading }] as const;
};
