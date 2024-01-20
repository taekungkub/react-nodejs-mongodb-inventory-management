import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconAlertCircle,
  IconDiscount,
  IconCircleX,
  IconChecklist,
} from "@tabler/icons-react";
import { DashboardStockTy } from "../../types/dashboard.type";

const icons = [IconChecklist, IconDiscount, IconAlertCircle, IconCircleX];
const colors = ["green", "blue", "orange", "red"];

interface Props {
  data: DashboardStockTy[];
}

export function StatsGridStock({ data }: Props) {
  const stats = data.map((stat, i) => {
    const Icon = icons[i];
    const color = colors[i];
    return (
      <Paper withBorder p="md" radius="md" mt={"md"} key={stat.title}>
        <Group>
          <Text size="lg" fw={"bold"}>
            {stat.value}
          </Text>
        </Group>
        <Group justify="space-between" gap="xs" mt={25}>
          <Text size="sm">{stat.title}</Text>
          <Icon color={color} size="1.4rem" stroke={1.5} />
        </Group>
      </Paper>
    );
  });
  return (
    <div>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}
