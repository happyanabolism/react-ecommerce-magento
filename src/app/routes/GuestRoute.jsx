import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCustomer } from "@entities/customer";
import { ROUTES } from "@shared/constants";

export const GuestRoute = ({ children, redirectTo = ROUTES.HOME }) => {
  const customer = useSelector(selectCustomer);

  if (customer) {
    return <Navigate to={redirectTo} replace />
  }

  return children;
}
