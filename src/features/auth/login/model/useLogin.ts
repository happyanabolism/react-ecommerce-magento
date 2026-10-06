import { useMutation } from '@apollo/client/react';
import { setToken } from '@entities/session';
import { GENERATE_CUSTOMER_TOKEN } from '@entities/session';
import type { GenerateCustomerTokenMutationVariables } from '@shared/api';
import { useAppDispatch } from '@shared/lib';

export const useLogin = () => {
  const [generateCustomerToken, result] = useMutation(GENERATE_CUSTOMER_TOKEN);
  const dispatch = useAppDispatch();

  const login = async (variables: GenerateCustomerTokenMutationVariables) => {
    try {
      const { data } = await generateCustomerToken({ variables });
      const token = data?.generateCustomerToken?.token;
      if (token) {
        dispatch(setToken(token));
      }
    } catch {
      // error will arrive in result.error
    }
  };

  return [login, result] as const;
};
