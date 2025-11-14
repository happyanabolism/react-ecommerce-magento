import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthCustomer } from "@entities/customer";
import { ROUTES } from "@shared/constants";
import { Button, DropdownMenu, DropdownMenuItem } from "@shared/ui";

export const CustomerMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const customer = useSelector(selectAuthCustomer);

  const dispatch = useDispatch();

  useEffect(() => {
    setAnchorEl(null);
  }, [customer])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
      {customer && (
        <>
          <Button onClick={handleClick} variant="link">
            Hello, {customer.firstname}
          </Button>
          <DropdownMenu
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <DropdownMenuItem onClick={handleClose}>
              <Link to={ROUTES.ACCOUNT_DASHBOARD}>My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClose}>
              <Button onClick={handleLogout} variant="link">
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
  )
}
