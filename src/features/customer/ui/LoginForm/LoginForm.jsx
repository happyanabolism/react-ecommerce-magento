import { useEffect } from 'react';
import { Link } from "react-router";
import { useApolloClient } from '@apollo/client/react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login, selectCustomerError, selectCustomerLoading } from '@entities/customer';
import { Button, FormInput } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const loading = useSelector(selectCustomerLoading);
  const serverError = useSelector(selectCustomerError);

  useEffect(() => {
    dispatch(clearError())
  }, [])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: 'onChange',
    // defaultValues: {
    //   email: 'testDefaultValue'
    // }
  });

  // useEffect(() => {
  //   // Data from server
  //   reset({
  //     email: 'example@gmail.com'
  //   })
  // }, [reset])

  const onSubmit = (formData) => {
    dispatch(login({
      email: formData.email,
      password: formData.password,
      client: client
    }));
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <FormInput
          label="Email"
          placeholder="example@gmail.com"
          className={styles.inputField}
          error={errors.email}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            }
          })}
        />
        <FormInput
          label="Password"
          type="password"
          className={styles.inputField}
          error={errors.password}
          {...register('password', {
            required: 'This field is required'
          })}
        />
      </fieldset>
      {serverError && (
        <p>{serverError}</p>
      )}
      <div className={styles.formActions}>
        <Button variant="primary" loading={isSubmitting || loading}>
          {isSubmitting || loading ? 'Logging In...' : 'Log In'}
        </Button>
        <Link to={'#'}>Forgot password?</Link>
      </div>
      <div className={styles.formFooter}>
        Don't have an account? <Link to={ROUTES.REGISTRATION}>Sign Up</Link>
      </div>
    </form>
  )
}
