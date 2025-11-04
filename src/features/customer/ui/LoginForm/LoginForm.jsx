import { useApolloClient } from '@apollo/client/react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { login, selectCustomerError, selectCustomerLoading } from '@entities/customer';
import { Spinner } from '@shared/ui';
import './LoginForm.module.scss';

export function LoginForm() {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const loading = useSelector(selectCustomerLoading);
  const serverError = useSelector(selectCustomerError);

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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {loading && <Spinner />}
      <div>
        <input
          type="email"
          placeholder="Enter email:"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            }
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className='field-validation-error'>{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter password:"
          {...register('password', {
            required: 'This field is required'
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p className='field-validation-error'>{errors.password.message}</p>
        )}
      </div>
      {serverError && (
        <p>{serverError}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting || loading}
      >
        {isSubmitting || loading ? 'Login...' : 'Login'}
      </button>
    </form>
  )
}
