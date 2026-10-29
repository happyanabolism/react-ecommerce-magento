import { useState } from 'react';
import { ReviewRatingFields } from '../ReviewRatingFields/ReviewRatingFields';

export const ProductReviewForm = () => {
  const [valueIdByRatingId, setValueIdByRatingId] = useState<
    Record<string, string>
  >({});

  const handleRatingChange = (id: string, value: string) => {
    setValueIdByRatingId((current) => ({ ...current, [id]: value }));
  };

  return (
    <ReviewRatingFields
      valueIdByRatingId={valueIdByRatingId}
      onChange={handleRatingChange}
    />
  );
};
