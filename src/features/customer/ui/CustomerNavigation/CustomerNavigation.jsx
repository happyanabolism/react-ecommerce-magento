import { useCustomer } from "@entities/customer/model/useCustomer";
import { ROUTES } from "@shared/constants";
import { Link } from "react-router";

export const CustomerNavigation = () => {
  const { customer } = useCustomer();

  return (
    <>
      {customer && (
        <Link to={'/customer'}>My Account</Link>
      )}
      {!customer && (
        <>
          <Link to={ROUTES.LOGIN}>Login</Link>
          <Link to={'/sign-up'}>Register</Link>
        </>
      )}
    </>
  )
}
