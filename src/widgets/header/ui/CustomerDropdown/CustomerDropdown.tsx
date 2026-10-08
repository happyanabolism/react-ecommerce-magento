import { Link } from 'react-router';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  PageLoader,
} from '@shared/ui';
import { ROUTES } from '@shared/config';
import type { CustomerFieldsFragment } from '@shared/api';
import { useLogout } from '@features/auth/logout';

export const CustomerDropdown = ({
  customer,
}: {
  customer: CustomerFieldsFragment;
}) => {
  const [logout, { loading }] = useLogout();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='link'>Hello, {customer.firstname}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to={ROUTES.ACCOUNT_DASHBOARD}>My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {loading && <PageLoader />}
    </>
  );
};
