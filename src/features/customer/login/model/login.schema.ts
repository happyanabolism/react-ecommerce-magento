import * as yup from 'yup';
import { emailField } from '@shared/lib/validation';

export const schema = yup.object().shape({
  email: emailField,
  password: yup.string().required('This field is required'),
});
