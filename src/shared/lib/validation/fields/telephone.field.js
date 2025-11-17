import * as yup from 'yup';

const regExpTelephone = /^\+44 \d{4} \d{6}$/;

export const telephoneField = yup
  .string()
  .required('This field is required')
  .matches(regExpTelephone, 'Invalid phone number');
