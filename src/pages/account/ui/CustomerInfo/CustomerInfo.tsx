import { useCustomer } from '@entities/customer';
import {
  UpdatePersonalInfoForm,
  UpdateCustomerEmailForm,
  UpdateCustomerPasswordForm,
} from '@features/customer-update';
import { Alert, AlertDescription, Button, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';

export const CustomerInfo = () => {
  const { customer, loading, error } = useCustomer();

  if (!customer && loading) return <Spinner />;
  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  if (!customer)
    return (
      <Alert variant='destructive'>
        <AlertDescription>Something went wrong!</AlertDescription>
      </Alert>
    );

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
