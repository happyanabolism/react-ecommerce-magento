import { ROUTES } from "@shared/constants";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children, redirectTo = ROUTES.LOGIN }) => {
  // get customer is authorized from store
  const isAuthorized = false;
  const customerStatus = 'error';

  if (customerStatus === 'idle') {
    return <p>Customer loading...</p>
  }

  if (!isAuthorized && customerStatus === 'error') {
    return <Navigate to={redirectTo} replace />
  }

  return children;
}
