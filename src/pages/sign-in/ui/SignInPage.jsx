import { Header } from '@widgets/header';
import { SignInForm } from '@features/auth';

export function SignInPage() {
  console.log('Sign IN page rendered');
  return (
    <>
      <title>Login</title>

      <Header />
      <main>
        <div className="container">
          <h1>Login Form</h1>
          <SignInForm />
        </div>
      </main>
    </>
  )
}
