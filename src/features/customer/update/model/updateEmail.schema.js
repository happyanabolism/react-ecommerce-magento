import * as yup from 'yup';
import { emailField, passwordField } from '@shared/lib/validation';

export const updateEmailSchema = yup.object().shape({
  email: emailField,
  password: yup.string().required('This field is required'),
  passwordConfirm: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
