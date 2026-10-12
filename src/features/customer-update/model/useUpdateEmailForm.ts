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
  const {
    mutate: updateCustomerEmail,
    isPending,
    error,
    reset: resetMutation,
  } = useUpdateEmail();
  const pending = isPending || form.formState.isSubmitting;

  const onSubmit = form.handleSubmit((formData: UpdateEmailFormData) => {
    const { passwordConfirm, ...variables } = formData;
    updateCustomerEmail(variables, { onSuccess });
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
