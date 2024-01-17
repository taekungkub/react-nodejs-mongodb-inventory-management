import { ActionIcon, Avatar, Box, Card, Flex, Group, Text, ThemeIcon, UnstyledButton, rem } from "@mantine/core"
import { IconChevronRight, IconTrash } from "@tabler/icons-react"
import { CartItemTy } from "../types/product.type"

interface Props {
  item: CartItemTy
}

function CardCartItem({ item }: Props) {
  return (
    <>
      <Card withBorder radius={"md"} mt={12} mb={"md"}>
        <Card.Section>
          <UnstyledButton className="w-full items !shadow-none" p={"md"}>
            <Group align={"center"}>
              <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" radius={"md"} />
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {item.title}
                </Text>
                <Text c="dimmed" size="xs">
                  Qty: {item.qty}
                </Text>

                <Text c="dimmed" size="xs">
                  ${item.price} / Per Item
                </Text>
              </div>
              <ActionIcon variant="light" color="red">
                <IconTrash size={"1rem"} />
              </ActionIcon>
            </Group>
          </UnstyledButton>
        </Card.Section>
      </Card>
    </>
  )
}

export default CardCartItem
