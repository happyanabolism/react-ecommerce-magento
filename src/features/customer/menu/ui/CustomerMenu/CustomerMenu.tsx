import { useEffect, useState, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { logout, selectAuthCustomer } from '@entities/customer';
import { ROUTES } from '@shared/constants';
import { Button, DropdownMenu, DropdownMenuItem } from '@shared/ui';
import { useAppDispatch } from '@shared/lib';

export const CustomerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const customer = useSelector(selectAuthCustomer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setAnchorEl(null);
  }, [customer]);

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
      {customer && (
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
      )}
      {!customer && (
        <>
          <Link to={ROUTES.LOGIN}>Login</Link>
        </>
      )}
    </>
  );
};
