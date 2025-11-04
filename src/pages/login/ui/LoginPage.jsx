import { Header } from '@widgets/header';
import { LoginForm } from '@features/customer';
import { Container } from '@shared/ui';

export function LoginPage() {
  return (
    <>
      <title>Login</title>

      <Container>
        <h1>Login Form</h1>
        <LoginForm />
      </Container>
    </>
  )
}
