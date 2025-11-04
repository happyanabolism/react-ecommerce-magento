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
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          <Link to={'/sign-up'}>Sign Up</Link>
        </>
      )}
    </>
  )
}
