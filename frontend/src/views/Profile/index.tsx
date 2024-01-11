import { Title } from "@mantine/core"
import FormProfile from "../../components/FormProfile"

export default function ProfilePage() {
  return (
    <div>
      <Title order={3}>Profile</Title>
      <div>
        <FormProfile />
      </div>
    </div>
  )
}
