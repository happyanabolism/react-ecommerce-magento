import { Alert, AlertDescription, RatingField, Spinner } from '@shared/ui';
import { useProductReviewRatingsMetadata } from '../../model/useProductReviewRatingsMetadata';

interface ReviewRatingFieldsProps {
  valueIdByRatingId: Record<string, string>;
  onChange: (id: string, value: string) => void;
}

export const ReviewRatingFields = ({
  valueIdByRatingId,
  onChange,
}: ReviewRatingFieldsProps) => {
  const { data: ratings, isPending, error } = useProductReviewRatingsMetadata();

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

  console.log('ratings', ratings);

  return (
    <>
      {ratings.map((rating) => (
        <RatingField
          key={rating.id}
          name={rating.id}
          label={rating.name}
          value={valueIdByRatingId[rating.id]}
          options={rating.values
            .filter((option) => option != null)
            .map((option) => ({
              label: option.value,
              value: option.value_id,
            }))}
          onChange={(value) => onChange(rating.id, value)}
        />
      ))}
    </>
  );
};
