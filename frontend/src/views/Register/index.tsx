import { useState } from "react"
import AuthLayout from "../../layouts/AuthLayout"
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Anchor, Stack, Center, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import useToast from "../../hooks/use-toast"
import { RegisterSchema } from "../../validation/auth.schema"
import BackendServices from "../../services/BackendServices"
import { useNavigate } from "react-router-dom"

export default function RegisterPage(props: PaperProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      username: "taekungkub",
      email: "tae@gmail.com",
      password: "123456",
      confirm_password: "123456",
    },

    validate: zodResolver(RegisterSchema),
  })

  const toast = useToast()
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Title mb={"lg"}>Register</Title>

        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              setIsLoading(true)
              const res = await BackendServices.register({
                ...form.values,
              })
              toast.success({ msg: "Register successfully" })
              form.reset()
            } catch (error: any) {
              toast.error({ msg: error.description ? error.description : "Something went wrong" })
            } finally {
              setIsLoading(false)
            }
          })}
        >
          <Stack>
            <TextInput required label="Username" {...form.getInputProps("username")} radius="md" />
            <TextInput required label="Email" {...form.getInputProps("email")} radius="md" />
            <PasswordInput required label="Password" {...form.getInputProps("password")} radius="md" />
            <PasswordInput required label="Confirm password" {...form.getInputProps("confirm_password")} radius="md" />
          </Stack>

          <Button type="submit" fullWidth mt={"md"} loading={isLoading}>
            Register
          </Button>

          <Center>
            <Anchor onClick={() => navigate("/login")} type="button" c="dimmed" size="xs" mt={"md"}>
              Back to login
            </Anchor>
          </Center>
        </form>
      </Paper>
    </AuthLayout>
  )
}
