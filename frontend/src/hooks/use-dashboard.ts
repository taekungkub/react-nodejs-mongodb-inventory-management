import BackendServices from "../services/BackendServices";
import useToast from "../hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useDashboard() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const useDashboardQuery = () =>
    useQuery({
      queryKey: ["dashboard"],
      queryFn: async () => await BackendServices.dashboard(),
      select: (res) => res.data.data,
    });

  const useDashboardStockQuery = () =>
    useQuery({
      queryKey: ["dashboard-stock"],
      queryFn: async () => await BackendServices.dashboardStock(),
      select: (res) => res.data.data,
    });

  return { useDashboardQuery, useDashboardStockQuery };
}
