import { useCustomer } from '@entities/customer/model/useCustomer';
import { Grid } from '@shared/ui';
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
        <Grid>
          <p>the first item</p>
          <p>the second item</p>
          <p>the third item</p>
          <p>the fourth item</p>
          <p>the fiveth item</p>
        </Grid>
      </main>
    </>
  );
}
