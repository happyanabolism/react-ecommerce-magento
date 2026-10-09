import { LoginForm } from '@features/auth/login';
import { Container } from '@shared/ui';

export function LoginPage() {
  return (
    <>
      <title>Log In</title>

      <Container>
        <div className='mx-auto max-w-sm py-10'>
          <LoginForm />
        </div>
      </Container>
    </>
  );
}
