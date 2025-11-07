import { useApolloClient } from '@apollo/client/react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login, selectCustomerError, selectCustomerLoading } from '@entities/customer';
import { Button, FormInput } from '@shared/ui';
import { useEffect } from 'react';
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormInput
        label="Email"
        placeholder="example@gmail.com"
        {...register('email', {
          required: 'This field is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          }
        })}
        error={errors.email}
      />
      <FormInput
        label="Password"
        type="password"
        {...register('password', {
          required: 'This field is required'
        })}
        error={errors.password}
      />
      {serverError && (
        <p>{serverError}</p>
      )}
      <Button variant="primary" loading={isSubmitting || loading}>
        {isSubmitting || loading ? 'Login...' : 'Login'}
      </Button>
    </form>
  )
}
