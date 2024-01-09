import { TextInput, Paper, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import useAuth from "../context/AuthContext"

type Props = {}

export default function FormProfile({}: Props) {
  const { user } = useAuth()
  const form = useForm({
    initialValues: {
      id: user?._id || "",
      username: user?.username || "",
      email: user?.email || "",
    },
  })

  return (
    <div>
      <Paper radius="md" p="xl" withBorder mt={"md"}>
        <form>
          <Stack>
            <TextInput readOnly label="ID" {...form.getInputProps("id")} radius="md" />
            <TextInput readOnly label="Username" {...form.getInputProps("username")} radius="md" />
            <TextInput readOnly label="Email" {...form.getInputProps("email")} radius="md" />
          </Stack>
        </form>
      </Paper>
    </div>
  )
}
