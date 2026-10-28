import { formatDate } from '@shared/lib';
import { Rating } from '@shared/ui';

interface ReviewItemProps {
  nickname: string;
  title: string;
  text: string;
  createdAt: string;
  rating?: number;
}

export const ReviewItem = ({
  nickname,
  title,
  text,
  createdAt,
  rating,
}: ReviewItemProps) => {
  return (
    <article className='flex flex-col gap-2 py-6'>
      {rating != null && <Rating value={rating} />}
      <h3 className='font-semibold'>{title}</h3>
      <p className='whitespace-pre-line'>{text}</p>
      <p className='text-sm text-muted-foreground'>
        {nickname} · <time dateTime={createdAt}>{formatDate(createdAt)}</time>
      </p>
    </article>
  );
};
