import { Menu, Group, Text, Avatar, ActionIcon } from "@mantine/core"
import { IconSettings, IconTrash, IconLogin, IconUser, IconLogout, IconLock } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import useAuth from "../context/AuthContext"

export default function DropdownProfile() {
  const navigate = useNavigate()

  const { logout } = useAuth()

  return (
    <div>
      <Group p="center">
        <Menu withArrow width={200} position={"bottom-end"} transitionProps={{ transition: "pop" }}>
          <Menu.Target>
            <ActionIcon variant={"transparent"} size={"sm"}>
              <Avatar size={32} radius={"lg"} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Divider />
            <Menu.Label>Profile</Menu.Label>
            <Menu.Item leftSection={<IconUser size="1rem" stroke={1.5} />} onClick={() => navigate("/profile")}>
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconLock size="1rem" stroke={1.5} />} onClick={() => navigate("/changepassword")}>
              Change Password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconLogout size="1rem" stroke={1.5} />} onClick={() => logout()}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  )
}
