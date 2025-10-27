import { Header } from "@widgets/header";
import LoginForm from "@features/Customer/ui/LoginForm";

export function SignInPage() {
  return (
    <>
      <title>Login</title>

      <Header />
      <main>
        <div className="container">
          <h1>Login Form</h1>
          <LoginForm />
        </div>
      </main>
    </>
  )
}