import * as yup from 'yup';
import { passwordField } from '@shared/lib/validation';

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('This field is required'),
  newPassword: passwordField,
  newPasswordConfirm: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});
