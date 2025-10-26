import { useMutation } from "@apollo/client/react"
import { GENERATE_CUSTOMER_TOKEN } from "../api/customerApi"

export const useGenerateCustomerToken = () => {
  const [generateToken, { data, loading, error }] = useMutation(GENERATE_CUSTOMER_TOKEN);

  const generateCustomerToken = (email, password) => {
    return generateToken({
      variables: {
        email: email,
        password: password,
      }
    })
  }

  return [generateCustomerToken, { data, loading, error }];
}