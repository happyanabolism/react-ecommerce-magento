import { RegistrationForm } from "@features/customer";
import { Container } from "@shared/ui";
import styles from "./RegistrationPage.module.scss"

export const RegistrationPage = () => {
  return (
    <>
      <title>Sign Up</title>

      <Container>
        <div className={styles.registrationFormWrapper}>
          <h1>Sign Up</h1>
          <RegistrationForm />
        </div>
      </Container>
    </>
  )
}
