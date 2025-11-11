import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCustomer } from "@entities/customer";
import { ROUTES } from "@shared/constants";
import { DropdownMenu, DropdownMenuItem } from "@shared/ui";

export const CustomerNavigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const customer = useSelector(selectCustomer);

  const dispatch = useDispatch();

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
          <button onClick={handleClick}>Hello, {customer.firstname}</button>
          <DropdownMenu
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <DropdownMenuItem>
              <Link to={'/customer'}>My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
            <DropdownMenuItem>Link 3</DropdownMenuItem>
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
