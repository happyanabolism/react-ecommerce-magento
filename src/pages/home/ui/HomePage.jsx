import { Button, Container, Pagination } from '@shared/ui';

export function HomePage() {
  return (
    <>
      <title>Home</title>

      <Container>
        <p>Buttons kit:</p>
        <div>
          <Button>Add to cart</Button>
          <Button variant="primary">Add to cart</Button>
          <Button variant="primary" loading>Add to cart</Button>
        </div>
        <br/>
        <br/>
        <div>
          <Button disabled>Add to cart</Button>
          <Button variant="primary" disabled>Add to cart</Button>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
      </Container>
    </>
  );
}
