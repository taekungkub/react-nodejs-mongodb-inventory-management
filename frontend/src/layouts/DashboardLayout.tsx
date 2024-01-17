"use client"
import { AppShell, Burger, Group, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { TheSidebar } from "../components/TheSidebar/TheSidebar"
import DropdownProfile from "../components/DropdownProfile"

export default function AdminLayout() {
  const [opened, { toggle, close }] = useDisclosure()

  const pathname = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    close()
  }, [pathname])

  return (
    <>
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 60 } }}
        navbar={{
          width: { base: 200, md: 300 },
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify={"space-between"}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Backoffice
            </Title>
            <DropdownProfile />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>{<TheSidebar />}</AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  )
}
