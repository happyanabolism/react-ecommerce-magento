import { useMutation } from '@tanstack/react-query';
import { GENERATE_CUSTOMER_TOKEN, setToken } from '@entities/session';
import {
  request,
  type GenerateCustomerTokenMutationVariables,
} from '@shared/api';
import { useAppDispatch } from '@shared/lib';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (variables: GenerateCustomerTokenMutationVariables) =>
      request(GENERATE_CUSTOMER_TOKEN, variables),
    onSuccess: (response) => {
      const token = response.generateCustomerToken?.token;
      if (token) {
        dispatch(setToken(token));
      }
    },
  });
};
