import { useCustomer } from "@entities/customer"

export const AccountDashboardPage = () => {
  const { customer, loading, error } = useCustomer();

  return (
    <>
      Customer dashboard page
      {customer && (
        <>
          <p>{customer.firstname}</p>
          <p>{customer.lastname}</p>
        </>
      )}
    </>
  )
}
