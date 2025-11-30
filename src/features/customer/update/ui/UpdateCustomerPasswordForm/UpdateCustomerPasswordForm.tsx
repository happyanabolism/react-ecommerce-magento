import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useCustomerPasswordUpdate,
  updatePasswordSchema,
  type CustomerUpdatePasswordFormData,
} from '@features/customer/update';
import { Alert, Button, PasswordField } from '@shared/ui';

export const UpdateCustomerPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(updatePasswordSchema),
  });

  const [updatePassword, { loading, error }] = useCustomerPasswordUpdate();

  const onSubmit = (formData: CustomerUpdatePasswordFormData) => {
    updatePassword(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Change Password</legend>
        <PasswordField
          label='Current Password'
          error={errors?.currentPassword?.message}
          {...register('currentPassword')}
        />
        <PasswordField
          label='New Password'
          error={errors?.newPassword?.message}
          {...register('newPassword')}
        />
        <PasswordField
          label='Confirm New Password'
          error={errors?.newPasswordConfirm?.message}
          {...register('newPasswordConfirm')}
        />
      </fieldset>
      {error && <Alert type='error'>{error.message}</Alert>}
      <Button variant='primary' loading={loading || isSubmitting}>
        {loading || isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};
