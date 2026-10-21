import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  flatCustomAttributes,
  normalizeCustomAttributes,
  type CustomerFragment,
} from '@shared/api';
import { useUpdatePersonalInfo } from './useUpdatePersonalInfo';
import {
  updatePersonalInfoSchema,
  type UpdatePersonalInfoFormData,
} from './updatePersonalInfo.schema';

interface UseUpdatePersonalInfoFormOptions {
  customer: CustomerFragment;
  onSuccess?: () => void;
}

const toFormValues = (customer: CustomerFragment) =>
  updatePersonalInfoSchema.cast(
    {
      ...customer,
      custom_attributes: flatCustomAttributes(customer.custom_attributes),
    },
    { stripUnknown: true }
  );

export const useUpdatePersonalInfoForm = ({
  customer,
  onSuccess,
}: UseUpdatePersonalInfoFormOptions) => {
  const formId = useId();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(updatePersonalInfoSchema),
    defaultValues: toFormValues(customer),
  });
  const {
    mutate: updateCustomer,
    isPending,
    error,
    reset: resetMutation,
  } = useUpdatePersonalInfo();
  const pending = isPending || form.formState.isSubmitting;

  const onSubmit = form.handleSubmit((formData: UpdatePersonalInfoFormData) => {
    updateCustomer(
      {
        ...formData,
        custom_attributes: normalizeCustomAttributes(
          formData.custom_attributes
        ),
      },
      { onSuccess }
    );
  });

  const reset = () => {
    form.reset(toFormValues(customer));
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
