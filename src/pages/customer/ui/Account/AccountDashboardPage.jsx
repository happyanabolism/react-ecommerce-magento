import { useCustomer } from "@entities/customer"
import { Container } from "@shared/ui";

export const AccountDashboardPage = () => {
  const { customer, loading, error } = useCustomer();

  return (
    <>
      <title>Account</title>

      {customer && (
        <>
          <p>{customer.email}</p>
          <p>{customer.lastname}</p>
          <p>{customer.lastname}</p>
        </>
      )}

      {/* TODO: Account info widget */}
      {/* TODO: Addresses table widget */}
      {/* TODO: Orders table widget */}
    </>
  )
}
