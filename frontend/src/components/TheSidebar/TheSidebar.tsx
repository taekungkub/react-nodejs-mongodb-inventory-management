import { useState } from "react"
import { IconLogout, IconBox, IconUser } from "@tabler/icons-react"
import classes from "./TheSidebar.module.css"
import { ScrollArea, rem } from "@mantine/core"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../context/AuthContext"

const data = [
  { label: "Profile", icon: IconUser, path: "/profile" },
  { label: "Product", icon: IconBox, path: "/product" },
]

export function TheSidebar() {
  const [active, setActive] = useState("Billing")
  const location = useLocation()
  const navigation = useNavigate()

  const { logout } = useAuth()

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

      <div className={classes.footer}>
        <a className={classes.link} onClick={(event) => logout()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
