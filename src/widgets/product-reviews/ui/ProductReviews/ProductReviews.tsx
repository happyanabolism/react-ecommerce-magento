import { useState } from 'react';
import { ReviewItem } from '@entities/review';
import { Alert, AlertDescription, Button, Rating, Spinner } from '@shared/ui';
import { useProductReviews } from '../../model/useProductReviews';

interface ProductReviewsProps {
  sku: string;
}

const PAGE_SIZE = 1;

export const ProductReviews = ({ sku }: ProductReviewsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    data,
    isPending,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useProductReviews({
    sku,
    pageSize: PAGE_SIZE,
  });

  if (isPending)
    return (
      <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />
    );

  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  const handleShowMore = () => {
    if (!isExpanded) setIsExpanded(true); // loaded pages are already in the cache
    else fetchNextPage();
  };

  const handleShowLess = () => setIsExpanded(false);

  const { reviews, reviewCount, ratingSummary } = data;
  const shownReviews = isExpanded ? reviews : reviews.slice(0, PAGE_SIZE);

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
        <h2 className='text-xl font-semibold'>
          Product Reviews
          {reviewCount > 0 && (
            <span className='ml-1.5 font-normal text-muted-foreground'>
              ({reviewCount})
            </span>
          )}
        </h2>
        {ratingSummary > 0 && <Rating value={ratingSummary} />}
      </div>
      {reviewCount === 0 ? (
        <p className='text-muted-foreground'>
          Be the first to review this product
        </p>
      ) : (
        <>
          <div className='flex flex-col divide-y'>
            {shownReviews.map((review) => (
              <ReviewItem
                nickname={review.nickname}
                title={review.summary}
                text={review.text}
                createdAt={review.created_at}
                rating={review.average_rating}
                key={`${review.created_at}-${review.nickname}`}
              />
            ))}
          </div>
          {!isExpanded || hasNextPage ? (
            <Button
              className='self-start'
              disabled={isFetchingNextPage}
              onClick={handleShowMore}
            >
              {isFetchingNextPage ? 'Loading…' : 'Show more'}
            </Button>
          ) : reviews.length > PAGE_SIZE ? (
            <Button
              className='self-start'
              variant='outline'
              onClick={handleShowLess}
            >
              Show less
            </Button>
          ) : null}
        </>
      )}
    </section>
  );
};
