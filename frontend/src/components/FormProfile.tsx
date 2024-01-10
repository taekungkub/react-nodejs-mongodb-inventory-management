import { TextInput, Paper, Stack } from "@mantine/core"
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
        <form>
          <Stack>
            <TextInput readOnly label="ID" {...form.getInputProps("_id")} radius="md" />
            <TextInput readOnly label="Username" {...form.getInputProps("username")} radius="md" />
            <TextInput readOnly label="Email" {...form.getInputProps("email")} radius="md" />
          </Stack>
        </form>
      </Paper>
    </div>
  )
}
