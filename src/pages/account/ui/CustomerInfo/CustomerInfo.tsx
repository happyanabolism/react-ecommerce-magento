import { useCustomer } from '@entities/customer';
import { Alert, AlertDescription, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';
import { UpdateEmailDialog } from '../UpdateEmailDialog/UpdateEmailDialog';
import { UpdatePasswordDialog } from '../UpdatePasswordDialog/UpdatePasswordDialog';
import { UpdatePersonalInfoDialog } from '../UpdatePersonalInfoDialog/UpdatePersonalInfoDialog';

export const CustomerInfo = () => {
  const { customer, loading, error } = useCustomer();

  if (!customer && loading) return <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />;
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
      <UpdatePersonalInfoDialog customer={customer} />
      <UpdateEmailDialog />
      <UpdatePasswordDialog />
    </div>
  );
};
