import AuthLayout from "../../layouts/AuthLayout"
import { TextInput, PasswordInput, Paper, PaperProps, Button, Anchor, Stack, Center, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { LoginSchema } from "../../validation/auth.schema"
import useAuth from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginPage(props: PaperProps) {
  const form = useForm({
    initialValues: {
      username: "taekungkub",
      password: "123456",
    },

    validate: zodResolver(LoginSchema),
  })

  const { login, loadingSubmit } = useAuth()
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Title mb={"lg"}>Welcome</Title>
        <form onSubmit={form.onSubmit(async (values) => login(values.username, values.password))}>
          <Stack>
            <TextInput required label="Username" {...form.getInputProps("username")} radius="md" />
            <PasswordInput required label="Password" {...form.getInputProps("password")} radius="md" />
          </Stack>
          <Button type="submit" fullWidth mt={"md"} loading={loadingSubmit}>
            Login
          </Button>
          <Center>
            <Anchor onClick={() => navigate("/register")} type="button" c="dimmed" size="xs" mt={"md"}>
              Dont have an account? Register
            </Anchor>
          </Center>
        </form>
      </Paper>
    </AuthLayout>
  )
}
