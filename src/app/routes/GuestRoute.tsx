import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectJwt } from '@entities/session';
import { ROUTES } from '@shared/constants';

interface GuestRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const GuestRoute = ({
  children,
  redirectTo = ROUTES.ACCOUNT_DASHBOARD,
}: GuestRouteProps) => {
  const jwt = useSelector(selectJwt);

  if (jwt) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
