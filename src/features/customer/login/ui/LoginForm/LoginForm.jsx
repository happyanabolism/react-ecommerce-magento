import { useEffect } from 'react';
import { Link } from "react-router";
import { useApolloClient } from '@apollo/client/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login, selectAuthError, selectAuthLoading } from '@entities/customer';
import { Button, TextField, PasswordField } from '@shared/ui';
import { ROUTES } from '@shared/constants';
import { schema } from '@features/customer/login';
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();

  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearError())
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (formData) => {
    dispatch(login({
      client: apolloClient,
      email: formData.email,
      password: formData.password,
    }));
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className={styles.fieldset}>
        <TextField
          label="Email"
          error={errors?.email?.message}
          placeholder="example@gmail.com"
          {...register('email')}
        />
        <PasswordField
          label="Password"
          error={errors?.password?.message}
          {...register('password')}
        />
      </fieldset>
      {authError && (
        <p>{authError}</p>
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
