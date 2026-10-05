import { selectJwt } from '@entities/session';
import { ROUTES } from '@shared/constants';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) => {
  const jwt = useSelector(selectJwt);

  if (!jwt) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
