import { Link, useSearchParams } from 'react-router';
import { Search } from '@features/search';
import { Container } from '@shared/ui';
import { ROUTES } from '@shared/config';
import logo from '@shared/assets/icons/react.svg';
import { CategoryNav } from './CategoryNav/CategoryNav';
import { CustomerMenu } from './CustomerMenu/CustomerMenu';

export function Header() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  return (
    <header className='bg-purple-100 text-graphite-800'>
      <Container className='flex items-center justify-between py-3'>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt='Home' className='size-8' />
        </Link>
        <div className='w-1/2'>
          {/* the header is never remounted: a new key resets the field when q changes (Back, a new search) */}
          <Search key={searchQuery} />
        </div>
        <nav className='flex items-center gap-4 text-sm font-medium'>
          <CustomerMenu />
          <Link to={ROUTES.CART}>Cart</Link>
        </nav>
      </Container>
      <CategoryNav limit={5} />
    </header>
  );
}
