import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectJwt } from '@entities/session';
import { ROUTES } from '@shared/config';

interface GuestRouteProps {
  redirectTo?: string;
}

export const GuestRoute = ({
  redirectTo = ROUTES.ACCOUNT_DASHBOARD,
}: GuestRouteProps) => {
  const jwt = useSelector(selectJwt);
  const location = useLocation();
  // where the guest came from (e.g. the wish list heart), set by the page that sent them to login
  const from = (location.state as { from?: string } | null)?.from;

  if (jwt) {
    return <Navigate to={from ?? redirectTo} replace />;
  }

  return <Outlet />;
};
