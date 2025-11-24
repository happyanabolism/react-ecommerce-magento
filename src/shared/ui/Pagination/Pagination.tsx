import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  paginationFrameSize?: number;
  onPageChange: (page: number) => void;
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
  currentPage = 1,
  totalPages = 0,
  paginationFrameSize = 5,
  onPageChange,
}: PaginationProps) => {
  const paginationFrame = getPaginationFrame(
    currentPage,
    totalPages,
    paginationFrameSize
  );

  if (totalPages === 0) return null;

  return (
    <ul className={styles.pagination}>
      {currentPage > 1 && (
        <li key='prev'>
          <button
            className={clsx(styles.page)}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
        </li>
      )}
      {paginationFrame.map((page) => (
        <li key={page}>
          <button
            className={clsx(
              styles.page,
              currentPage === page ? styles.pageActive : ''
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      {currentPage < totalPages && (
        <li key='next'>
          <button
            className={clsx(styles.page)}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      )}
    </ul>
  );
};
