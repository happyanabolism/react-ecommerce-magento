import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from '../shadcn/pagination';

interface PaginationProps {
  currentPage?: number | null;
  totalPages?: number | null;
  paginationFrameSize?: number;
  getPageHref: (page: number) => string;
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
  getPageHref,
}: PaginationProps) => {
  if (currentPage == null || totalPages == null || totalPages <= 1) return null;

  const paginationFrame = getPaginationFrame(
    currentPage,
    totalPages,
    paginationFrameSize
  );

  return (
    <ShadcnPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious to={getPageHref(currentPage - 1)} />
          </PaginationItem>
        )}
        {paginationFrame.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              to={getPageHref(pageNumber)}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext to={getPageHref(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadcnPagination>
  );
};
