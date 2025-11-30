import * as yup from 'yup';

const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailField = yup
  .string()
  .required('This field is required')
  .matches(regExpEmail, 'Invalid email address');
