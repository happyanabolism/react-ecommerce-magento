import {
  firstnameField,
  lastnameField,
  telephoneField,
} from '@shared/lib/validation';
import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
  firstname: firstnameField,
  lastname: lastnameField,
  custom_attributes: yup.object({
    phone_number: telephoneField,
  }),
});
