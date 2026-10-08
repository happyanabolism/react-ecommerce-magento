import { Container, Button, Spinner } from '@shared/ui';

export function HomePage() {
  return (
    <>
      <title>Home</title>

      <Container>
        <p>Buttons kit:</p>
        <div>
          <Button>
            <Spinner></Spinner>Add to cart
          </Button>
          <Button>Add to cart</Button>
          <Button>Add to cart</Button>
        </div>
        <br />
        <br />
        <div>
          <Button disabled>Add to cart</Button>
          <Button disabled>Add to cart</Button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
}
