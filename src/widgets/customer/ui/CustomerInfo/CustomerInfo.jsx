import { useCustomer } from "@entities/customer";
import {
  UpdatePersonalInfoForm,
  UpdateCustomerEmailForm,
  UpdateCustomerPasswordForm
} from "@features/customer";
import { Alert, Button, Spinner } from "@shared/ui";
import { flatCustomAttributes, getAttributeValue } from "@shared/utils";

export const CustomerInfo = () => {
  const { customer, loading, error } = useCustomer();
  const flatCustomer = { ...customer, custom_attributes: flatCustomAttributes(customer?.custom_attributes)}
  const phone = getAttributeValue(customer?.custom_attributes, 'phone_number');

  return (
    <>
      {loading && <Spinner />}
      {error && <Alert type="error">{error.message}</Alert>}
      {customer && (
        <div>
          <p>{`${customer.firstname} ${customer.lastname}`}</p>
          <p>{customer.email}</p>
          <p>{phone ? (Array.isArray(phone) ? phone.join(', ') : phone) : '—'}</p>
          <Button variant="link">Edit</Button>
          <UpdatePersonalInfoForm customer={flatCustomer} />
          <UpdateCustomerEmailForm />
          <UpdateCustomerPasswordForm />
        </div>

      )}
    </>
  );
}
