import { Link } from 'react-router';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  PageLoader,
} from '@shared/ui';
import { ROUTES } from '@shared/config';
import type { CustomerFragment } from '@shared/api';
import { useLogout } from '@features/auth/logout';

interface CustomerDropdownProps {
  customer: CustomerFragment;
  wishlistItemsCount: number | null;
}

export const CustomerDropdown = ({
  customer,
  wishlistItemsCount,
}: CustomerDropdownProps) => {
  const { mutate: logout, isPending } = useLogout();

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
          <DropdownMenuItem asChild>
            <Link to={ROUTES.WISHLIST}>
              Wishlist
              {wishlistItemsCount ? (
                <Badge variant='secondary' className='ml-auto'>
                  {wishlistItemsCount}
                  <span className='sr-only'> items</span>
                </Badge>
              ) : null}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isPending && <PageLoader />}
    </>
  );
};
