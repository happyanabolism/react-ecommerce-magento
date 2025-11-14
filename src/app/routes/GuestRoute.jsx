import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectAuthCustomer } from "@entities/customer";
import { ROUTES } from "@shared/constants";

export const GuestRoute = ({ children, redirectTo = ROUTES.HOME }) => {
  const customer = useSelector(selectAuthCustomer);

  if (customer) {
    return <Navigate to={redirectTo} replace />
  }

  return children;
}
