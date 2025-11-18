import { Outlet } from "react-router"
import { Container } from "@shared/ui"
import { AccountNavigation } from "@widgets/customer"

export const AccountLayout = () => {
  return (
    <Container>
      <AccountNavigation />
      <Outlet />
    </Container>
  )
}
