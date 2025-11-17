import * as yup from 'yup';

const regExpName = /^[A-Za-z]+$/;

export const firstnameField = yup
  .string()
  .required('This field is required')
  .matches(regExpName, 'Invalid first name');
