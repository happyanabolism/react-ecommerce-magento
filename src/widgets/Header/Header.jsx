import { Link } from 'react-router';

function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="cart">Cart</Link>
    </header>
  );
}

export default Header;
