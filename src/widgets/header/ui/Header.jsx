import { Link } from "react-router";
import { CustomerMenu } from "@features/customer";
import { CategoryNav } from "@features/category";
import { ROUTE_CONSTANTS } from "@shared/config";
import { Container } from "@shared/ui";
import logo from "@shared/assets/icons/react.svg";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <div className="logo">
            <Link to={ROUTE_CONSTANTS.HOME}><img src={logo} /></Link>
          </div>
          <nav className="header-links">
            <ul style={{ gap: '8px' }}>
              <CustomerMenu />
              <Link to={ROUTE_CONSTANTS.CART}>Cart</Link>
            </ul>
          </nav>
        </div>
      </Container>
      <CategoryNav />
    </header>
  );
}
