import { Link } from 'react-router';
import './Header.css';
import logo from '@assets/react.svg';

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/"><img src={logo} /></Link>
          </div>
          <nav className="header-links">
            <ol>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
