import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  AlertDescription,
  Button,
  Spinner,
  PasswordField,
  TextField,
} from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import { useCustomerEmailUpdate } from '../../model/useCustomerEmailUpdate';
import {
  updateEmailSchema,
  type UpdateEmailFormData,
} from '../../model/updateEmail.schema';

export const UpdateCustomerEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(updateEmailSchema),
  });

  const [updateCustomerEmail, { loading, error }] = useCustomerEmailUpdate();

  const onSubmit = (formData: UpdateEmailFormData) => {
    const { passwordConfirm, ...variables } = formData;
    updateCustomerEmail(variables);
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
      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
        </Alert>
      )}
      <Button type='submit' disabled={loading || isSubmitting}>
        {(loading || isSubmitting) && <Spinner />}
        {loading || isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};
