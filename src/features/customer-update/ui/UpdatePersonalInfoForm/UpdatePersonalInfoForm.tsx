import { useForm /*, Controller */ } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Spinner, /* TelephoneField, */ TextField } from '@shared/ui';
import {
  flatCustomAttributes,
  getMagentoErrorMessage,
  normalizeCustomAttributes,
  type CustomerFieldsFragment,
} from '@shared/api';
import { useCustomerUpdate } from '../../model/useCustomerUpdate';
import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from '../../model/personalInfo.schema';

export const UpdatePersonalInfoForm = ({
  customer,
}: {
  customer: CustomerFieldsFragment;
}) => {
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(personalInfoSchema),
    defaultValues: personalInfoSchema.cast(
      {
        ...customer,
        custom_attributes: flatCustomAttributes(customer.custom_attributes),
      },
      { stripUnknown: true }
    ),
  });

  const [updateCustomer, { loading, error }] = useCustomerUpdate();

  const onSubmit = (formData: PersonalInfoFormData) => {
    const normalizedFormData = {
      ...formData,
      custom_attributes: normalizeCustomAttributes(formData.custom_attributes),
    };
    updateCustomer(normalizedFormData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Personal Info</legend>
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
        {/* TODO(customer-attributes): render custom attributes from attributesForm metadata
        <Controller
          name='custom_attributes.phone_number'
          control={control}
          render={({ field }) => (
            <TelephoneField
              label='Phone number'
              error={errors?.custom_attributes?.phone_number?.message}
              placeholder='+44 1234 567890'
              mask='+44 0000 000000'
              {...field}
            />
          )}
        />
        */}
      </fieldset>
      {error && <Alert type='error'>{getMagentoErrorMessage(error)}</Alert>}
      <Button type='submit' disabled={loading || isSubmitting}>
        {(loading || isSubmitting) && <Spinner />}
        {loading || isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};
