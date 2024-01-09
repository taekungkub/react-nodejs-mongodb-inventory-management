import { Center, Text, Title } from "@mantine/core"

type Props = {}

export default function NotFoundPage({}: Props) {
  return (
    <Center h={"100vh"}>
      <Title>404</Title>
      <Text> Page not found</Text>
    </Center>
  )
}
