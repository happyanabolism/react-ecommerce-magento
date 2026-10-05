import type { ReactNode } from 'react';
import { selectJwt } from '@entities/session';
import { ROUTES } from '@shared/constants';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) => {
  const jwt = useSelector(selectJwt);

  if (!jwt) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
