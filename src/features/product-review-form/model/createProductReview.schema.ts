import * as yup from 'yup';

export const createProductReviewSchema = yup.object({
  // valueId by ratingId, Magento doesn't require ratings
  ratings: yup.mixed<Record<string, string>>().required(),
  nickname: yup.string().trim().required('This field is required'),
  summary: yup.string().trim().required('This field is required'),
  text: yup.string().trim().required('This field is required'),
});

export type CreateProductReviewFormData = yup.InferType<
  typeof createProductReviewSchema
>;
