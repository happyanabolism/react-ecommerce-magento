import { Alert, AlertDescription, PasswordField } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import type { useUpdatePasswordForm } from '../../model/useUpdatePasswordForm';

type UpdatePasswordForm = ReturnType<typeof useUpdatePasswordForm>;

interface UpdatePasswordFieldsProps {
  form: UpdatePasswordForm['form'];
  error?: UpdatePasswordForm['error'];
}

export const UpdatePasswordFields = ({
  form,
  error,
}: UpdatePasswordFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
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
      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
