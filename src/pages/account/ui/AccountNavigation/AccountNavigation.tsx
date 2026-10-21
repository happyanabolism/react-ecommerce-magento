import { NavLink } from 'react-router';
import { cn } from 'cn';
import { ROUTES } from '@shared/config';

const LINKS = [
  { to: ROUTES.ACCOUNT_DASHBOARD, label: 'My Account' },
  { to: ROUTES.WISHLIST, label: 'My Wish List' },
];

export const AccountNavigation = () => {
  return (
    <nav aria-label='Account'>
      <ul className='flex flex-col gap-1'>
        {LINKS.map(({ to, label }) => (
          <li key={to}>
            {/* NavLink sets aria-current="page" on the active link */}
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  'block rounded-md px-3 py-2 hover:bg-muted',
                  isActive && 'bg-muted font-semibold'
                )
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
