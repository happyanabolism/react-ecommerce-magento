import { Header } from '@widgets/header';
import { LoginForm } from '@features/customer';

export function LoginPage() {
  return (
    <>
      <title>Login</title>

      <div className="container">
        <h1>Login Form</h1>
        <LoginForm />
      </div>
    </>
  )
}
