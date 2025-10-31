import { useCustomer } from '@entities/customer/model/useCustomer';
import { Header } from '@widgets/header';
import { CategoryNav } from '@widgets/menu';

export function HomePage() {
  const { customer } = useCustomer();

  return (
    <>
      <title>Home</title>

      <Header />
      <CategoryNav />
      <main>
        HomePage
        {customer && (
          <>
            <p>{customer.firstname}</p>
            <p>{customer.lastname}</p>
            <p>{customer.email}</p>
          </>
        )}
      </main>
    </>
  );
}
