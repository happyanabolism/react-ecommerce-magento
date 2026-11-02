import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  AlertDescription,
  Button,
  TextareaField,
  TextField,
} from '@shared/ui';
import { ReviewRatingFields } from '../ReviewRatingFields/ReviewRatingFields';
import { useCreateProductReview } from '../../model/useCreateProductReview';
import {
  createProductReviewSchema,
  type CreateProductReviewFormData,
} from '../../model/createProductReview.schema';

interface ReviewFormProps {
  sku: string;
  // the customer's name; a guest has none and types the nickname
  defaultNickname?: string;
}

export const ReviewForm = ({ sku, defaultNickname }: ReviewFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ratings: {}, nickname: defaultNickname },
    resolver: yupResolver(createProductReviewSchema),
  });
  const { mutate, isPending, error } = useCreateProductReview(sku);

  const onValid = (data: CreateProductReviewFormData) => {
    mutate({ ...data }, { onSuccess: () => reset() });
  };

  return (
    <form
      className='flex flex-col gap-4 w-1/2'
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      <Controller
        control={control}
        name='ratings'
        render={({ field }) => (
          <ReviewRatingFields
            valueIdByRatingId={field.value}
            onChange={(ratingId, valueId) =>
              field.onChange({ ...field.value, [ratingId]: valueId })
            }
          />
        )}
      ></Controller>
      <TextField
        label='Nickname'
        error={errors.nickname?.message}
        {...register('nickname')}
      />
      <TextField
        label='Summary'
        error={errors.summary?.message}
        {...register('summary')}
      />
      <TextareaField
        label='Text'
        error={errors.text?.message}
        {...register('text')}
      />
      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <Button type='submit' disabled={isPending}>
        Submit
      </Button>
    </form>
  );
};
