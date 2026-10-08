import { CustomerAddressBook } from '../CustomerAddressBook/CustomerAddressBook';
import { CustomerInfo } from '../CustomerInfo/CustomerInfo';

export const AccountDashboardPage = () => {
  return (
    <>
      <title>Account</title>

      <h1>Account Dashboard</h1>

      <section className='mb-8'>
        <h2>Customer information</h2>
        <CustomerInfo />
      </section>
      <section className='mb-8'>
        <h2>Address book</h2>
        <CustomerAddressBook />
      </section>
      <section className='mb-8'>
        <h2>Recent orders</h2>
        {/* TODO: Recent orders table widget */}
      </section>
    </>
  );
};
