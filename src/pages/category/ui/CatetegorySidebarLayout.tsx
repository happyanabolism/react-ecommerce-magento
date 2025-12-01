import { Children, type ReactNode } from 'react';
import styles from './CategorySidebarLayout.module.scss';

interface CategorySidebarLayoutProps {
  sidebar: ReactNode | ReactNode[];
  content: ReactNode | ReactNode[];
}

export const CategorySidebarLayout = ({
  sidebar,
  content,
}: CategorySidebarLayoutProps) => {
  return (
    <div className={styles.categorySidebarLayout}>
      <aside>{Children.toArray(sidebar)}</aside>
      <div>{Children.toArray(content)}</div>
    </div>
  );
};
