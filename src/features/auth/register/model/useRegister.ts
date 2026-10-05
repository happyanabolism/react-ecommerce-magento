import { useMutation } from '@apollo/client/react';
import { CREATE_CUSTOMER } from '../api/registerApi';
import { GENERATE_CUSTOMER_TOKEN, setToken } from '@entities/session';
import { useAppDispatch } from '@shared/lib';
import type { RegistrationFormData } from './registration.schema';
import { normalizeCustomAttributes } from '@shared/utils';

export const useRegister = () => {
  const [createCustomer, createCustomerResult] = useMutation(CREATE_CUSTOMER);
  const [generateCustomerToken, loginResult] = useMutation(
    GENERATE_CUSTOMER_TOKEN
  );
  const dispatch = useAppDispatch();

  const register = async (formData: RegistrationFormData) => {
    const { passwordConfirm, ...input } = formData;
    try {
      await createCustomer({
        variables: {
          input: {
            ...input,
            custom_attributes: normalizeCustomAttributes(
              input.custom_attributes
            ),
          },
        },
      });
      const { data } = await generateCustomerToken({
        variables: {
          email: input.email,
          password: input.password,
        },
      });
      const token = data?.generateCustomerToken?.token;

      if (token) {
        dispatch(setToken(token));
      }
    } catch {
      // errors are returned in error
    }
  };

  return [
    register,
    {
      loading: createCustomerResult.loading || loginResult.loading,
      error: createCustomerResult.error || loginResult.error,
    },
  ] as const;
};
