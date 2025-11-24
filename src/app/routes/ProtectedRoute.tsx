import type { ReactNode } from 'react';
import { selectAuthCustomer } from '@entities/customer';
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
  const customer = useSelector(selectAuthCustomer);

  if (!customer) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
