import { Alert, AlertDescription, FieldGroup, PasswordField } from '@shared/ui';
import type { useUpdatePasswordForm } from '../../model/useUpdatePasswordForm';

type UpdatePasswordForm = ReturnType<typeof useUpdatePasswordForm>;

interface UpdatePasswordFieldsProps {
  state: UpdatePasswordForm['state'];
  error?: UpdatePasswordForm['error'];
}

export const UpdatePasswordFields = ({
  state,
  error,
}: UpdatePasswordFieldsProps) => {
  return (
    <>
      <FieldGroup>
        <PasswordField
          label='Current Password'
          name='currentPassword'
          error={state.errors?.currentPassword}
          defaultValue={state.values?.currentPassword}
        />
        <PasswordField
          label='New Password'
          name='newPassword'
          error={state.errors?.newPassword}
          defaultValue={state.values?.newPassword}
        />
        <PasswordField
          label='Confirm New Password'
          name='newPasswordConfirm'
          error={state.errors?.newPasswordConfirm}
          defaultValue={state.values?.newPasswordConfirm}
        />
      </FieldGroup>
      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
