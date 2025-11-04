import { Link } from 'react-router';
import { CustomerNavigation } from '@features/customer';
import { ROUTE_CONSTANTS } from '@shared/config';
import { Container } from '@shared/ui';
import logo from '@shared/assets/icons/react.svg';
import './Header.scss';

export function Header() {
  return (
    <header>
      <Container>
        <div className="header-content">
          <div className="logo">
            <Link to={ROUTE_CONSTANTS.HOME}><img src={logo} /></Link>
          </div>
          <nav className="header-links">
            <CustomerNavigation />
            <Link to={ROUTE_CONSTANTS.CART}>Cart</Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
