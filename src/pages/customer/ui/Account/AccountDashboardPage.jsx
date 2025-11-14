import { useCustomer } from "@entities/customer"
import { Container } from "@shared/ui";

export const AccountDashboardPage = () => {
  const { customer, loading, error } = useCustomer();

  return (
    <Container>
      Customer dashboard page
      {customer && (
        <>
          <p>{customer.email}</p>
          <p>{customer.lastname}</p>
          <p>{customer.lastname}</p>
        </>
      )}
    </Container>
  )
}
