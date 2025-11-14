import { selectAuthCustomer } from "@entities/customer";
import { ROUTES } from "@shared/constants";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children, redirectTo = ROUTES.LOGIN }) => {
  const customer = useSelector(selectAuthCustomer);

  if (!customer) {
    return <Navigate to={redirectTo} replace />
  }

  return children;
}
