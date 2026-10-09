import { Link } from 'react-router';

import { Container } from '@shared/ui';
import { ROUTES } from '@shared/config';
import logo from '@shared/assets/icons/react.svg';
import { CategoryNav } from './CategoryNav/CategoryNav';
import { CustomerMenu } from './CustomerMenu/CustomerMenu';

export function Header() {
  return (
    <header className='bg-purple-100 text-graphite-800'>
      <Container className='flex items-center justify-between py-3'>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt='Home' className='size-8' />
        </Link>
        <nav className='flex items-center gap-4 text-sm font-medium'>
          <CustomerMenu />
          <Link to={ROUTES.CART}>Cart</Link>
        </nav>
      </Container>
      <CategoryNav limit={5} />
    </header>
  );
}
