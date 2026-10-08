import { useCustomerAddresses } from '@entities/address';
import { Alert, AlertDescription, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';

export const CustomerAddressBook = () => {
  const { addresses, loading, error } = useCustomerAddresses();

  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  if (loading) return <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />;

  return addresses.length === 0 ? (
    <div>No addresses</div>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Company</th>
          <th>Street</th>
          <th>Postcode</th>
          <th>Country Code</th>
          <th>City</th>
          <th>Region</th>
          <th>Telephone</th>
          <th>Default Shipping</th>
          <th>Default Billing</th>
        </tr>
      </thead>
      <tbody>
        {addresses.map((address) => {
          return (
            <tr key={address.id}>
              <td>{address.firstname}</td>
              <td>{address.lastname}</td>
              <td>{address.company}</td>
              <td>
                {address.street.map((streetLine, index) => (
                  <p key={index}>{streetLine}</p>
                ))}
              </td>
              <td>{address.postcode}</td>
              <td>{address.countryCode}</td>
              <td>{address.city}</td>
              <td>{address.region}</td>
              <td>{address.telephone}</td>
              <td>{address.isDefaultShippingAddress ? 'yes' : 'no'}</td>
              <td>{address.isDefaultBillingAddress ? 'yes' : 'no'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
