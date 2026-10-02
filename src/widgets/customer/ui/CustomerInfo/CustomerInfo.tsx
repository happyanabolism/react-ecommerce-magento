import { useCustomer } from '@entities/customer';
import {
  UpdatePersonalInfoForm,
  UpdateCustomerEmailForm,
  UpdateCustomerPasswordForm,
} from '@features/customer';
import { Alert, Button, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/utils';

export const CustomerInfo = () => {
  const { customer, loading, error } = useCustomer();

  if (!customer && loading) return <Spinner />;
  if (error) return <Alert type='error'>{getMagentoErrorMessage(error)}</Alert>;
  if (!customer) return <Alert type='error'>Something went wrong!</Alert>;

  return (
    /* TODO(customer-attributes): show custom attributes from attributesForm metadata */
    <div>
      <p>{`${customer.firstname} ${customer.lastname}`}</p>
      <p>{customer.email}</p>
      <Button variant='link'>Edit</Button>
      <UpdatePersonalInfoForm customer={customer} />
      <UpdateCustomerEmailForm />
      <UpdateCustomerPasswordForm />
    </div>
  );
};
