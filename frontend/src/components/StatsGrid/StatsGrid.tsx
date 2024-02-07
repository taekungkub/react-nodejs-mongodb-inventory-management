import { Group, Paper, SimpleGrid, Text } from "@mantine/core"
import { IconUserPlus, IconDiscount2, IconReceipt2, IconCoin } from "@tabler/icons-react"
import classes from "./StatsGrid.module.css"
import { DashboardTy } from "../../types/dashboard.type"

const icons = [IconReceipt2, IconUserPlus, IconDiscount2, IconCoin]

interface Props {
  data: DashboardTy[]
}

export function StatsGrid({ data }: Props) {
  const stats = data.map((stat, i) => {
    const Icon = icons[i]

    return (
      <Paper shadow="sm" withBorder p="md" radius="md" mt={"md"} key={stat.title}>
        <Group justify="space-between">
          <Text size="sm" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon color="gray" className={classes.icon} size="1.725rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" gap="xs" mt={25}>
          <Text size="lg" className={classes.value}>
            {stat.value}
          </Text>
        </Group>
      </Paper>
    )
  })
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  )
}
