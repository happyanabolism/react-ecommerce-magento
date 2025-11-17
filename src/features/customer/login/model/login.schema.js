import * as yup from 'yup';
import { emailField, passwordField } from '@shared/lib/validation';

export const schema = yup.object().shape({
  email: emailField,
  password: passwordField,
});
