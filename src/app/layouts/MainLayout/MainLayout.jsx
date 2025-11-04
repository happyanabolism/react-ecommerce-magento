import { Outlet } from "react-router"
import { Header } from "@widgets/header"
import { Container } from "@shared/ui"

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <Container>Footer</Container>
      </footer>
    </>
  )
}
