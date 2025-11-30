import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useCustomerEmailUpdate,
  updateEmailSchema,
  type CustomerUpdateEmailInput,
} from '@features/customer/update';
import { Alert, Button, PasswordField, TextField } from '@shared/ui';

export const UpdateCustomerEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(updateEmailSchema),
  });

  const [updateEmail, { loading, error }] = useCustomerEmailUpdate();

  const onSubmit = (formData: CustomerUpdateEmailInput) => {
    updateEmail(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Change Email</legend>
        <TextField
          label='New Email'
          placeholder='example@gmail.com'
          type='email'
          error={errors?.email?.message}
          {...register('email')}
        />
        <PasswordField
          label='Password'
          error={errors?.password?.message}
          {...register('password')}
        />
        <PasswordField
          label='Confirm Password'
          error={errors?.passwordConfirm?.message}
          {...register('passwordConfirm')}
        />
      </fieldset>
      {error && <Alert type='error'>{error.message}</Alert>}
      <Button variant='primary' loading={loading || isSubmitting}>
        {loading || isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};
