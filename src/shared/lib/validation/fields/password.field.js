import * as yup from 'yup';

export const passwordField = yup
  .string()
  .required('This field is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-ZА-ЯЁ]/, 'Password must have at least one uppercase letter')
  .matches(/[a-zа-яё]/, 'Password must have at least one lowercase letter')
  .matches(/\d/, 'Password must have at least one number')
  .matches(/[!@#$%^&*.,]/, 'Password must have at least one special character');
