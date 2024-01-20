import { useState } from "react"
import { IconBox, IconShoppingCart, IconBook, IconDashboard, IconUsersGroup, IconBrandProducthunt, IconBoxAlignBottom, IconShoppingCartPlus, IconUserPlus } from "@tabler/icons-react"
import classes from "./TheSidebar.module.css"
import { ScrollArea, rem } from "@mantine/core"
import { useLocation, useNavigate } from "react-router-dom"

const data = [
  { label: "Dashboard", icon: IconDashboard, path: "/dashboard" },
  { label: "Shop", icon: IconShoppingCart, path: "/shop" },
  { label: "Stock", icon: IconBox, path: "/stock" },
  { label: "Order", icon: IconBook, path: "/order" },
  { label: "Category", icon: IconShoppingCartPlus, path: "/category" },
  { label: "User", icon: IconUserPlus, path: "/user" },

]

export function TheSidebar() {
  const [active, setActive] = useState("/")
  const location = useLocation()
  const navigation = useNavigate()


  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={location.pathname.startsWith(item.path) || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
        navigation(item.path)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <ScrollArea h={`calc(100vh - ${rem(200)})`}>
        <div className={classes.navbarMain}>{links}</div>
      </ScrollArea>

      {/* <div className={classes.footer}>
        <hr />

        <a className={classes.link} onClick={(event) => logout()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div> */}
    </nav>
  )
}
