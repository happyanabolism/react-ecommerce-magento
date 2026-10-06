import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, PasswordField } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import { useCustomerPasswordUpdate } from '../../model/useCustomerPasswordUpdate';
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from '../../model/updatePassword.schema';

export const UpdateCustomerPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(updatePasswordSchema),
  });

  const [changeCustomerPassword, { loading, error }] =
    useCustomerPasswordUpdate();

  const onSubmit = (formData: UpdatePasswordFormData) => {
    const { newPasswordConfirm, ...variables } = formData;
    changeCustomerPassword(variables);
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
      {error && <Alert type='error'>{getMagentoErrorMessage(error)}</Alert>}
      <Button type='submit' variant='primary' loading={loading || isSubmitting}>
        {loading || isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};
