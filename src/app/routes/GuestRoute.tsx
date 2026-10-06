import { Navigate, Outlet } from 'react-router';
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

  if (jwt) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
