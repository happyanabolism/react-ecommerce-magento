import * as yup from 'yup';
import {
  emailField,
  passwordField,
  firstnameField,
  lastnameField,
  telephoneField,
} from '@shared/lib/validation';

export const schema = yup.object().shape({
  firstname: firstnameField,
  lastname: lastnameField,
  email: emailField,
  custom_attributes: yup.object({
    phone_number: telephoneField,
  }),
  password: passwordField.test(
    'not-same-as-email',
    "The password can't be the same as the email address.",
    function (value) {
      const { email } = this.parent;
      if (!value || !email) {
        return true;
      }

      return value.toLocaleLowerCase() !== email.toLocaleLowerCase();
    }
  ),
  passwordConfirm: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
