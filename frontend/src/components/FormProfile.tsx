import { TextInput, Paper, Stack, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import useAuth from "../context/AuthContext"
import { useEffect } from "react"

export default function FormProfile() {
  const { user } = useAuth()

  const form = useForm({
    initialValues: {
      _id: "",
      username: "",
      email: "",
      role:''
    },
  })

  useEffect(() => {
    if (user) {
      form.setValues({
        ...user,
      })
    }
  }, [user])

  return (
    <div>
      <Paper radius="md" p="xl" withBorder mt={"md"}>
      <Title order={3} mb={'md'}>Infomation</Title>
        <form>
          <Stack>
            <TextInput readOnly label="ID" {...form.getInputProps("_id")} radius="md" />
            <TextInput readOnly label="Username" {...form.getInputProps("username")} radius="md" />
            <TextInput readOnly label="Email" {...form.getInputProps("email")} radius="md" />
            <TextInput readOnly label="Role" {...form.getInputProps("role")} radius="md" />

          </Stack>
        </form>
      </Paper>
    </div>
  )
}
