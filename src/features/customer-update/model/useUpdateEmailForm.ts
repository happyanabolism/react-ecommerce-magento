import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateEmail } from './useUpdateEmail';
import {
  updateEmailSchema,
  type UpdateEmailFormData,
} from './updateEmail.schema';

interface UseUpdateEmailFormOptions {
  onSuccess?: () => void;
}

export const useUpdateEmailForm = ({
  onSuccess,
}: UseUpdateEmailFormOptions = {}) => {
  const formId = useId();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(updateEmailSchema),
  });
  const [updateCustomerEmail, { loading, error, reset: resetMutation }] =
    useUpdateEmail();
  const pending = loading || form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (formData: UpdateEmailFormData) => {
    const { passwordConfirm, ...variables } = formData;
    const ok = await updateCustomerEmail(variables);
    if (ok) onSuccess?.();
  });

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
