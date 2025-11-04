import { selectCustomer, selectStatus } from "@entities/customer";
import { ROUTES } from "@shared/constants";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children, redirectTo = ROUTES.LOGIN }) => {
  const customer = useSelector(selectCustomer);
  const status = useSelector(selectStatus);

  if (status === 'idle') {
    return <p>Customer loading...</p>
  }

  if (!customer && status === 'error') {
    return <Navigate to={redirectTo} replace />
  }

  return children;
}
