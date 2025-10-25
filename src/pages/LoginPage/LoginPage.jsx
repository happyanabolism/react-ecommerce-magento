import Header from "@widgets/Header/Header";
import LoginForm from "@features/Customer/ui/LoginForm";

function LoginPage() {
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

export default LoginPage;