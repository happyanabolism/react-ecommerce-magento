import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { personalInfoSchema } from "@features/customer/update"
import { useCustomerUpdate } from "@entities/customer"
import { Alert, Button, TelephoneField, TextField } from "@shared/ui"
import { flatCustomAttributes, getAttributeValue, normalizeCustomAttributes } from "@shared/utils"

export const UpdatePersonalInfoForm = ({ customer }) => {

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(personalInfoSchema),
    defaultValues: personalInfoSchema.cast(customer, { stripUnknown: true })
  });

  const [updateCustomer, { loading, error }] = useCustomerUpdate();

  const onSubmit = (formData) => {
    const normalizedFormData = { ...formData, custom_attributes: normalizeCustomAttributes(formData.custom_attributes)};
    updateCustomer(normalizedFormData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Personal Info</legend>
        <TextField
          label="First Name"
          error={errors?.firstname?.message}
          {...register('firstname')}
        />
        <TextField
          label="Last Name"
          error={errors?.lastname?.message}
          {...register('lastname')}
        />
        <Controller
          name="custom_attributes.phone_number"
          control={control}
          render={({ field }) => (
            <TelephoneField
              label="Phone number"
              error={errors?.custom_attributes?.phone_number?.message}
              placeholder="+44 1234 567890"
              mask="+44 0000 000000"
              {...field}
            />
          )}
        />
      </fieldset>
      {error && <Alert type="error">{error.message}</Alert>}
      <Button variant="primary" loading={loading || isSubmitting}>
        {loading || isSubmitting ? 'Updating...' : 'Update'}
      </Button>
    </form>
  )
}
