import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { Button, DropdownMenu, DropdownMenuItem, PageLoader } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import type { CustomerFieldsFragment } from '@shared/api/gql/graphql';
import { useLogout } from '@features/auth/logout';

export const CustomerDropdown = ({
  customer,
}: {
  customer: CustomerFieldsFragment;
}) => {
  const [logout, { loading }] = useLogout();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Button onClick={handleClick} variant='link'>
        Hello, {customer.firstname}
      </Button>
      <DropdownMenu anchorEl={anchorEl} onClose={handleClose}>
        <DropdownMenuItem onClick={handleClose}>
          <Link to={ROUTES.ACCOUNT_DASHBOARD}>My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClose}>
          <Button onClick={handleLogout} variant='link'>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenu>
      {loading && <PageLoader />}
    </>
  );
};
