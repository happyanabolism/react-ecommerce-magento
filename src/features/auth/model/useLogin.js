import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useGenerateCustomerToken, loginSuccess } from '@entities/customer';

export const useLogin = () => {
  const [genrateCustomerToken, { loading, error }] = useGenerateCustomerToken();

  const dispatch = useDispatch();

  const login = useCallback(
    async (email, password) => {
      const token = await genrateCustomerToken(email, password);
      console.log(token);
      dispatch(loginSuccess({ token }));
    },
    [genrateCustomerToken, dispatch]
  );

  return [login, { loading, error }];
};
