import { Alert, AlertDescription, TextField } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import type { useUpdatePersonalInfoForm } from '../../model/useUpdatePersonalInfoForm';

type UpdatePersonalInfoForm = ReturnType<typeof useUpdatePersonalInfoForm>;

interface UpdatePersonalInfoFieldsProps {
  form: UpdatePersonalInfoForm['form'];
  error?: UpdatePersonalInfoForm['error'];
}

export const UpdatePersonalInfoFields = ({
  form,
  error,
}: UpdatePersonalInfoFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <TextField
        label='First Name'
        error={errors?.firstname?.message}
        {...register('firstname')}
      />
      <TextField
        label='Last Name'
        error={errors?.lastname?.message}
        {...register('lastname')}
      />
      {/* TODO(customer-attributes): render custom attributes from attributesForm
          metadata (phone: TelephoneField through a Controller with form.control) */}
      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
