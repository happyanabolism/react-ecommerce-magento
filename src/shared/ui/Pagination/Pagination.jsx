import { useEffect, useLayoutEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Pagination.module.scss"

const PAGINATION_FRAME_SIZE = 5;

const getPaginationFrame = (currentPage, lastPage) => {
  // get start and end of pagination frame
  let startOfFrame = Math.max(currentPage - Math.floor(PAGINATION_FRAME_SIZE / 2), 1);
  let endOfFrame = startOfFrame + PAGINATION_FRAME_SIZE - 1;

  if (endOfFrame > lastPage) {
    startOfFrame = Math.max(startOfFrame - (endOfFrame - lastPage), 1);
    endOfFrame = lastPage;
  }

  return Array.from({length: endOfFrame - startOfFrame + 1}, (_, pageNum) => startOfFrame + pageNum);
}

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const paginationFrame = getPaginationFrame(currentPage, totalPages);

  return (
    <ul className={styles.pagination}>
      {currentPage > 1 && (
        <li
          key="prev"
          className={clsx(styles.page)}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </li>
      )}
      {paginationFrame.map((page) => (
        <li
          key={page}
          className={clsx(styles.page, currentPage === page ? styles.pageActive : '')}
          onClick={() => onPageChange(page)}
        >
          {page}
        </li>
      ))}
      {currentPage < totalPages && (
        <li
          key="next"
          className={clsx(styles.page)}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </li>
      )}
    </ul>
  )
}
