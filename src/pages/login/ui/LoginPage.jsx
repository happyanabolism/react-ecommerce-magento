import { Header } from '@widgets/header';
import { LoginForm } from '@features/customer';

export function LoginPage() {
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
