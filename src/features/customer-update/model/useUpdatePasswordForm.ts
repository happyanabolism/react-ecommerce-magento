import { useId, useActionState, startTransition } from 'react';
import { ValidationError } from 'yup';
import { useUpdatePassword } from './useUpdatePassword';
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from './updatePassword.schema';

interface UseUpdatePasswordFormOptions {
  onSuccess?: () => void;
}

type UpdatePasswordErrors = Partial<
  Record<keyof UpdatePasswordFormData, string>
>;

interface UpdatePasswordState {
  errors: UpdatePasswordErrors;
  // what was sent: React resets the fields after the action, they come back from here
  values?: Partial<UpdatePasswordFormData>;
}

const initialState: UpdatePasswordState = { errors: {} };

// yup puts every failed rule into inner; keep the first message per field
const toFieldErrors = (error: ValidationError) => {
  const errors: UpdatePasswordErrors = {};
  for (const fieldError of error.inner) {
    errors[fieldError.path as keyof UpdatePasswordFormData] ??=
      fieldError.message;
  }
  return errors;
};

export const useUpdatePasswordForm = ({
  onSuccess,
}: UseUpdatePasswordFormOptions = {}) => {
  const formId = useId();
  const {
    mutateAsync: changeCustomerPassword,
    error,
    reset: resetMutation,
  } = useUpdatePassword();

  // a null payload resets the state (the dialog calls it on open)
  const updatePasswordAction = async (
    _prevState: UpdatePasswordState,
    formData: FormData | null
  ): Promise<UpdatePasswordState> => {
    if (!formData) {
      return initialState;
    }

    // the form has only text fields, so every value is a string
    const values = Object.fromEntries(
      formData
    ) as Partial<UpdatePasswordFormData>;

    try {
      const data = await updatePasswordSchema.validate(values, {
        abortEarly: false,
      });
      const { newPasswordConfirm, ...variables } = data;
      await changeCustomerPassword(variables);
      onSuccess?.();
      return initialState;
    } catch (caughtError) {
      if (caughtError instanceof ValidationError) {
        return { values, errors: toFieldErrors(caughtError) };
      }
      // a server error: its message comes from the mutation's error
      return { values, errors: {} };
    }
  };

  const [state, formAction, isPending] = useActionState(
    updatePasswordAction,
    initialState
  );

  const reset = () => {
    startTransition(() => formAction(null));
    resetMutation();
  };

  return {
    reset,
    state,
    error,
    pending: isPending,
    formProps: { id: formId, action: formAction, noValidate: true },
    submitProps: { type: 'submit', form: formId, disabled: isPending },
  } as const;
};
