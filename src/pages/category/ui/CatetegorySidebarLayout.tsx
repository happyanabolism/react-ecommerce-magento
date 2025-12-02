import { type ReactNode } from 'react';
import styles from './CategorySidebarLayout.module.scss';

interface CategorySidebarLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export const CategorySidebarLayout = ({
  sidebar,
  content,
}: CategorySidebarLayoutProps) => {
  return (
    <div className={styles.categorySidebarLayout}>
      <aside>{sidebar}</aside>
      <div>{content}</div>
    </div>
  );
};
