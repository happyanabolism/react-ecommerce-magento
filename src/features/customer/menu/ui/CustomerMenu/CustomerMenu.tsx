import { Link } from 'react-router';
import { useCustomer } from '@entities/customer';
import { selectJwt } from '@entities/session';
import { CustomerDropdown } from '@features/customer';
import { ROUTES } from '@shared/constants';
import { useAppSelector } from '@shared/lib';

export const CustomerMenu = () => {
  const jwt = useAppSelector(selectJwt);
  const { customer } = useCustomer();

  if (!jwt) return <Link to={ROUTES.LOGIN}>Login</Link>;
  if (!customer) return <span>Hello</span>;

  return <CustomerDropdown customer={customer} />;
};
