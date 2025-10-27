import { Link } from 'react-router';
import { ROUTE_CONSTANTS } from '@shared/config';
import logo from '@shared/assets/icons/react.svg';
import './Header.scss';

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to={ROUTE_CONSTANTS.HOME}><img src={logo} /></Link>
          </div>
          <nav className="header-links">
            <ol>
              <li><Link to={ROUTE_CONSTANTS.SIGN_IN}>Sign In</Link></li>
              <li><Link to={ROUTE_CONSTANTS.CART}>Cart</Link></li>
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}
