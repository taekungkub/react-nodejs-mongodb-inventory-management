import { Title } from "@mantine/core"
import { StatsGrid } from "../../components/StatsGrid/StatsGrid"
import  useDashboard from "../../hooks/use-dashboard"
export default function DashboardPage() {

  const {useDashboardQuery} = useDashboard()

  const dashboardQyery = useDashboardQuery()
  return (
    <div>
      <Title order={3}>Dashboard</Title>
      <StatsGrid data={dashboardQyery.data || []}/>
    </div>
  )
}
