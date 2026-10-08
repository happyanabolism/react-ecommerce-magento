import { Alert, AlertDescription, PasswordField, TextField } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import type { useUpdateEmailForm } from '../../model/useUpdateEmailForm';

type UpdateEmailForm = ReturnType<typeof useUpdateEmailForm>;

interface UpdateEmailFieldsProps {
  form: UpdateEmailForm['form'];
  error?: UpdateEmailForm['error'];
}

export const UpdateEmailFields = ({ form, error }: UpdateEmailFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <fieldset>
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
      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
