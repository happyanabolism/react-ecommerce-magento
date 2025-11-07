import { LoginForm, RegistrationForm } from "@features/customer";
import { Container } from "@shared/ui";
import styles from "./LoginPage.module.scss"

export function LoginPage() {
  return (
    <>
      <title>Login</title>

      <Container>
        <div className={styles.loginWrapper}>
          <h1>Account Login</h1>
          <LoginForm />
          <RegistrationForm />
        </div>
      </Container>
    </>
  )
}
