import { useContext } from 'react';
import { CategoryLink } from '@entities/category';
import { StoreContext } from '@entities/store';
import { useCategoryNav } from '@features/category';
import { Container, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/utils';
import styles from './CategoryNav.module.scss';

export function CategoryNav() {
  const storeConfig = useContext(StoreContext);
  const { categories, loading, error } = useCategoryNav(
    storeConfig?.root_category_uid
  );

  if (error) return <p>{getMagentoErrorMessage(error)}</p>;
  if (loading) return <Spinner />;

  return (
    <nav className={styles.navigation}>
      <Container>
        {categories && (
          <ul>
            {categories.map((category) => (
              <li key={category.uid} className={styles.categoryLink}>
                <CategoryLink category={category} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </nav>
  );
}
