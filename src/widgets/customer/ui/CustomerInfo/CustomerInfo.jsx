import { useCustomer } from "@entities/customer";
import {
  UpdatePersonalInfoForm,
  UpdateCustomerEmailForm,
  UpdateCustomerPasswordForm
} from "@features/customer";
import { Alert, Button, Spinner } from "@shared/ui";

export const CustomerInfo = () => {
  const { customer, loading, error } = useCustomer();

  return (
    <>
      {loading && <Spinner />}
      {error && <Alert type="error">{error.message}</Alert>}
      {customer && (
        <div>
          <p>{`${customer.firstname} ${customer.lastname}`}</p>
          <p>{customer.email}</p>
          {customer.custom_attributes.phone_number && (
            <p>{customer.custom_attributes.phone_number}</p>
          )}
          <Button variant="link">Edit</Button>
        </div>
      )}
    </>
  );
}
