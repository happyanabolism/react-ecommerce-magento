import { StarIcon } from 'lucide-react';
import { cn } from 'cn';

const MAX_STARS = 5;

interface RatingProps {
  // 0–100, as Magento sends ratings (average_rating, rating_summary)
  value: number;
  className?: string;
}

export const Rating = ({ value, className }: RatingProps) => {
  const percent = Math.min(Math.max(value, 0), 100);
  const stars = Array.from({ length: MAX_STARS }, (_, index) => (
    <StarIcon key={index} className='size-4 shrink-0 fill-current' />
  ));

  return (
    <span
      role='img'
      aria-label={`Rated ${Math.round((percent / 100) * MAX_STARS * 10) / 10} out of ${MAX_STARS}`}
      className={cn('relative inline-flex w-fit', className)}
    >
      <span className='flex text-muted-foreground/30'>{stars}</span>
      {/* the coloured copy is cut to the rating width, so 70% fills three and a half stars */}
      <span
        className='absolute inset-y-0 left-0 flex overflow-hidden text-warning'
        style={{ width: `${percent}%` }}
      >
        {stars}
      </span>
    </span>
  );
};
