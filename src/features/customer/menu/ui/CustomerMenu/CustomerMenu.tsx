import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAuthCustomer } from '@entities/customer';
import { CustomerDropdown } from '@features/customer';
import { ROUTES } from '@shared/constants';

export const CustomerMenu = () => {
  const customer = useSelector(selectAuthCustomer);

  return (
    <>
      {customer ? (
        <CustomerDropdown customer={customer} />
      ) : (
        <Link to={ROUTES.LOGIN}>Login</Link>
      )}
    </>
  );
};
