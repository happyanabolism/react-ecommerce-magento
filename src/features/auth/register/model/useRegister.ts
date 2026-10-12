import { useMutation } from '@tanstack/react-query';
import { CREATE_CUSTOMER } from '../api/registerApi';
import { GENERATE_CUSTOMER_TOKEN, setToken } from '@entities/session';
import { useAppDispatch } from '@shared/lib';
import type { RegistrationFormData } from './registration.schema';
import { normalizeCustomAttributes, request } from '@shared/api';
import { toast } from 'sonner';

export const useRegister = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (formData: RegistrationFormData) => {
      const { passwordConfirm, ...input } = formData;
      await request(CREATE_CUSTOMER, {
        input: {
          ...input,
          custom_attributes: normalizeCustomAttributes(input.custom_attributes),
        },
      });

      const response = await request(GENERATE_CUSTOMER_TOKEN, {
        email: input.email,
        password: input.password,
      });

      return response.generateCustomerToken?.token;
    },
    onSuccess: (token) => {
      if (token) {
        dispatch(setToken(token));
        toast.success('Account successfully created');
      }
    },
  });
};
