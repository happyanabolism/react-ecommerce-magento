import { Link } from 'react-router';
import { ROUTE_CONSTANTS } from '@shared/config';
import logo from '@shared/assets/icons/react.svg';
import './Header.scss';
import { CustomerNavigation } from '@features/customer';

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to={ROUTE_CONSTANTS.HOME}><img src={logo} /></Link>
          </div>
          <nav className="header-links">
            <CustomerNavigation />
            <Link to={ROUTE_CONSTANTS.CART}>Cart</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
