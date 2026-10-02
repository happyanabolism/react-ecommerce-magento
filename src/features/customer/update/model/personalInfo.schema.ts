import {
  firstnameField,
  lastnameField,
  // telephoneField,
} from '@shared/lib/validation';
import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
  firstname: firstnameField,
  lastname: lastnameField,
  custom_attributes: yup.object({
    // TODO(customer-attributes): custom attributes differ per backend, build
    // fields and validation from attributesForm metadata instead of hardcoding
    // phone_number: telephoneField,
  }),
});

export type PersonalInfoFormData = yup.InferType<typeof personalInfoSchema>;
