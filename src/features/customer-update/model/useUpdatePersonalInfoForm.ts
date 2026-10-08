import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  flatCustomAttributes,
  normalizeCustomAttributes,
  type CustomerFieldsFragment,
} from '@shared/api';
import { useUpdatePersonalInfo } from './useUpdatePersonalInfo';
import {
  updatePersonalInfoSchema,
  type UpdatePersonalInfoFormData,
} from './updatePersonalInfo.schema';

interface UseUpdatePersonalInfoFormOptions {
  customer: CustomerFieldsFragment;
  onSuccess?: () => void;
}

export const useUpdatePersonalInfoForm = ({
  customer,
  onSuccess,
}: UseUpdatePersonalInfoFormOptions) => {
  const formId = useId();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(updatePersonalInfoSchema),
    defaultValues: updatePersonalInfoSchema.cast(
      {
        ...customer,
        custom_attributes: flatCustomAttributes(customer.custom_attributes),
      },
      { stripUnknown: true }
    ),
  });
  const [updateCustomer, { loading, error }] = useUpdatePersonalInfo();
  const pending = loading || form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(
    async (formData: UpdatePersonalInfoFormData) => {
      const ok = await updateCustomer({
        ...formData,
        custom_attributes: normalizeCustomAttributes(
          formData.custom_attributes
        ),
      });
      if (ok) onSuccess?.();
    }
  );

  return {
    form,
    error,
    pending,
    formProps: { id: formId, onSubmit, noValidate: true },
    submitProps: { type: 'submit', form: formId, disabled: pending },
  } as const;
};
