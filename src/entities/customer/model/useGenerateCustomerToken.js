import { useMutation } from '@apollo/client/react';
import { GENERATE_CUSTOMER_TOKEN } from '../api/customerApi';

export const useGenerateCustomerToken = () => {
  const [generateToken, { loading, error }] = useMutation(
    GENERATE_CUSTOMER_TOKEN
  );

  const generateCustomerToken = async (email, password) => {
    const { data } = await generateToken({
      variables: {
        email: email,
        password: password,
      },
    });

    return data?.generateCustomerToken?.token;
  };

  return [generateCustomerToken, { loading, error }];
};
