import { Title } from "@mantine/core"
import useAuth from "../../context/AuthContext"
import FormProfile from "../../components/FormProfile"

type Props = {}

export default function ProfilePage({}: Props) {
  const { user } = useAuth()
  return (
    <div>
      <Title order={3}>Profile</Title>
      <div>
        <FormProfile />
      </div>
    </div>
  )
}
