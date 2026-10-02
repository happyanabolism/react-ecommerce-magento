import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage?: number | null;
  totalPages?: number | null;
  paginationFrameSize?: number;
  onPageChange?: (page: number) => void;
}

const getPaginationFrame = (
  currentPage: number,
  lastPage: number,
  paginationFrameSize: number
): number[] => {
  // get start and end of pagination frame
  let startOfFrame = Math.max(
    currentPage - Math.floor(paginationFrameSize / 2),
    1
  );
  let endOfFrame = startOfFrame + paginationFrameSize - 1;

  if (endOfFrame > lastPage) {
    startOfFrame = Math.max(startOfFrame - (endOfFrame - lastPage), 1);
    endOfFrame = lastPage;
  }

  return Array.from(
    { length: endOfFrame - startOfFrame + 1 },
    (_, pageNum) => startOfFrame + pageNum
  );
};

export const Pagination = ({
  currentPage,
  totalPages,
  paginationFrameSize = 5,
  onPageChange,
}: PaginationProps) => {
  const page = currentPage ?? 1;
  const total = totalPages ?? 0;

  const paginationFrame = getPaginationFrame(page, total, paginationFrameSize);

  if (total === 0) return null;

  return (
    <ul className={styles.pagination}>
      {page > 1 && (
        <li key='prev'>
          <button
            className={clsx(styles.page)}
            onClick={() => onPageChange && onPageChange(page - 1)}
          >
            Prev
          </button>
        </li>
      )}
      {paginationFrame.map((activePage) => (
        <li key={activePage}>
          <button
            className={clsx(
              styles.page,
              page === activePage ? styles.pageActive : ''
            )}
            onClick={() => onPageChange && onPageChange(activePage)}
          >
            {activePage}
          </button>
        </li>
      ))}
      {page < total && (
        <li key='next'>
          <button
            className={clsx(styles.page)}
            onClick={() => onPageChange && onPageChange(page + 1)}
          >
            Next
          </button>
        </li>
      )}
    </ul>
  );
};
