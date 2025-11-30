import { CustomerInfo } from "@widgets/customer";

export const AccountDashboardPage = () => {

  return (
    <>
      <title>Account</title>

      <h1>Account Dashboard</h1>

      <section>
        <h2>Customer information</h2>
        <CustomerInfo />
      </section>
      <section>
        <h2>Address book</h2>
        {/* TODO: Addresses table widget */}
      </section>
      <section>
        <h2>Recent orders</h2>
        {/* TODO: Recent orders table widget */}
      </section>
    </>
  )
}
