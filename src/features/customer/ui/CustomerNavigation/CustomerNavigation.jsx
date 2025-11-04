import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectCustomer } from "@entities/customer";
import { ROUTES } from "@shared/constants";

export const CustomerNavigation = () => {
  const customer = useSelector(selectCustomer);

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
