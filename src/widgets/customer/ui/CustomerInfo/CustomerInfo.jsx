import { useCustomer } from "@entities/customer";
import { getCustomAttributeValue } from "@shared/lib";
import { Alert, Button, Spinner } from "@shared/ui";

export const CustomerInfo = () => {
  const { customer, loading, error } = useCustomer();
  const phoneNumber = getCustomAttributeValue(customer, 'phone_number');


  return (
    <>
      {loading && <Spinner />}
      {error && <Alert type="error">{error.message}</Alert>}
      {customer && (
        <div>
          <p>{`${customer.firstname} ${customer.lastname}`}</p>
          <p>{customer.email}</p>
          {phoneNumber && (
            <p>{phoneNumber}</p>
          )}
          <Button variant="link">Edit</Button>
        </div>
      )}
    </>
  );
}
