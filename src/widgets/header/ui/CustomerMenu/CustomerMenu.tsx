import { Link } from 'react-router';
import { useCustomer } from '@entities/customer';
import { selectJwt } from '@entities/session';
import { ROUTES } from '@shared/config';
import { useAppSelector } from '@shared/lib';
import { Spinner } from '@shared/ui';
import { CustomerDropdown } from '../CustomerDropdown/CustomerDropdown';
import { useWishlist } from '@entities/wishlist';

export const CustomerMenu = () => {
  const jwt = useAppSelector(selectJwt);
  const { data: customer } = useCustomer();
  const { data: wishlist } = useWishlist();

  if (!jwt) return <Link to={ROUTES.LOGIN}>Login</Link>;
  if (!customer) return <Spinner />;

  return (
    <CustomerDropdown
      customer={customer}
      wishlistItemsCount={wishlist?.items_count ?? null}
    />
  );
};
