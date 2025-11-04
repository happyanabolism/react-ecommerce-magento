import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCustomer } from "@entities/customer";
import { ROUTES } from "@shared/constants";

export const CustomerNavigation = () => {
  const customer = useSelector(selectCustomer);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
      {customer && (
        <>
          <Link to={'/customer'}>My Account</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
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
