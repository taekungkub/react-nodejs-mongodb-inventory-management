import React from "react"
import { ProductTy } from "../types/product.type"
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core"

type Props = {
  item: ProductTy
}

export default function CardProduct({ item }: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.title}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {item.description}
      </Text>

      <Text size="sm" c="dimmed" mt={"md"}>
        {item.stock} / ${item.stock}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Add to cart
      </Button>
    </Card>
  )
}
