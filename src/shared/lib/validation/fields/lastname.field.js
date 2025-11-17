import * as yup from 'yup';

const regExpName = /^[A-Za-z]+$/;

export const lastnameField = yup
  .string()
  .required('This field is required')
  .matches(regExpName, 'Invalid last name');
