import { useCustomer } from '@entities/customer';
import {
  UpdatePersonalInfoForm,
  UpdateCustomerEmailForm,
  UpdateCustomerPasswordForm,
} from '@features/customer';
import { Alert, Button, Spinner } from '@shared/ui';
import { flatCustomAttributes } from '@shared/utils';

export const CustomerInfo = () => {
  const { customer, loading, error } = useCustomer();

  if (loading) return <Spinner />;
  if (error) return <Alert type='error'>{error.message}</Alert>;
  if (!customer) return <Alert type='error'>Something went wrong!</Alert>;

  const flatCustomer = {
    ...customer,
    custom_attributes: flatCustomAttributes(customer?.custom_attributes),
  };

  return (
    <div>
      <p>{`${flatCustomer.firstname} ${flatCustomer.lastname}`}</p>
      <p>{flatCustomer.email}</p>
      {flatCustomer.custom_attributes?.phone_number && (
        <p>{flatCustomer.custom_attributes?.phone_number}</p>
      )}
      <Button variant='link'>Edit</Button>
      <UpdatePersonalInfoForm customer={flatCustomer} />
      <UpdateCustomerEmailForm />
      <UpdateCustomerPasswordForm />
    </div>
  );
};
