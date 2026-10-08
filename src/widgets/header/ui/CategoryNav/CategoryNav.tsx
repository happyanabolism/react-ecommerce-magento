import { CategoryLink } from '@entities/category';
import { useCategoryNav } from '../../model/useCategoryNav';
import { Container, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import styles from './CategoryNav.module.scss';

export function CategoryNav({ limit }: { limit?: number }) {
  const { categories, loading, error } = useCategoryNav({
    limit,
  });

  if (error) return <p>{getMagentoErrorMessage(error)}</p>;
  if (loading) return <Spinner className='size-5 text-muted-foreground' />;

  return (
    <nav className={styles.navigation}>
      <Container>
        <ul>
          {categories.map((category) => (
            <li key={category.uid} className={styles.categoryLink}>
              <CategoryLink category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
