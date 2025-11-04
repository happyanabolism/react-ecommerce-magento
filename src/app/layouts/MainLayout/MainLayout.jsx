import { Outlet } from "react-router"
import { Header } from "@widgets/header"

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        footer
      </footer>
    </>
  )
}
