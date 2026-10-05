import { LoginForm } from '@features/auth/login';
import { Container } from '@shared/ui';
import styles from './LoginPage.module.scss';

export function LoginPage() {
  return (
    <>
      <title>Log In</title>

      <Container>
        <div className={styles.loginFormWrapper}>
          <h1>Log In</h1>
          <LoginForm />
        </div>
      </Container>
    </>
  );
}
