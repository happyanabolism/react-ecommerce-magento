import { ROUTES } from "@shared/constants";
import { Navigate } from "react-router";

export const GuestRoute = ({ children, redirectTo = ROUTES.HOME }) => {
  // get customer is authorized from store
  const isAuthorized = false;
  const customerStatus = 'error';

  if (customerStatus === 'idle') {
    return <p>Customer loading...</p>
  }

  if (isAuthorized) {
    return <Navigate to={redirectTo} replace />
  }

  return children;
}
