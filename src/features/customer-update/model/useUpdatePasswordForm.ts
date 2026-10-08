import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdatePassword } from './useUpdatePassword';
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from './updatePassword.schema';

interface UseUpdatePasswordFormOptions {
  onSuccess?: () => void;
}

export const useUpdatePasswordForm = ({
  onSuccess,
}: UseUpdatePasswordFormOptions = {}) => {
  const formId = useId();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(updatePasswordSchema),
  });
  const [changeCustomerPassword, { loading, error, reset: resetMutation }] =
    useUpdatePassword();
  const pending = loading || form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(
    async (formData: UpdatePasswordFormData) => {
      const { newPasswordConfirm, ...variables } = formData;
      const ok = await changeCustomerPassword(variables);
      if (ok) onSuccess?.();
    }
  );

  const reset = () => {
    form.reset();
    resetMutation();
  };

  return {
    form,
    reset,
    error,
    pending,
    formProps: { id: formId, onSubmit, noValidate: true },
    submitProps: { type: 'submit', form: formId, disabled: pending },
  } as const;
};
