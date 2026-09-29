import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { logout, type Customer } from '@entities/customer';
import { Button, DropdownMenu, DropdownMenuItem } from '@shared/ui';
import { useAppDispatch } from '@shared/lib';
import { ROUTES } from '@shared/constants';

type CustomerDropdownProps = {
  customer: Customer;
};

export const CustomerDropdown = ({ customer }: CustomerDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
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
    </>
  );
};
