import { createPortal } from 'react-dom';
import { Spinner } from '../Spinner/Spinner';
import styles from './PageLoader.module.scss';

// rendered into <body> so the parent's overflow/z-index can't clip the overlay
export const PageLoader = () => {
  return createPortal(
    <div className={styles.pageLoader} role='status' aria-label='Loading'>
      <Spinner />
    </div>,
    document.body
  );
};
