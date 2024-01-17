import BackendServices from "../services/BackendServices"
import useToast from "../hooks/use-toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { CreateOrderSchema } from "../schemas/order.schema"

export default function useOrder() {
  const toast = useToast()
  const queryClient = useQueryClient()

  const useOrderQuery = () =>
    useQuery({
      queryKey: ["orders"],
      queryFn: async () => await BackendServices.orders(),
      select: (res) => res.data.data,
    })

  const useCreateOrder = () =>
    useMutation({
      mutationFn: async (data: z.infer<typeof CreateOrderSchema>) => await BackendServices.createOrders(data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["orders"] })
        queryClient.invalidateQueries({ queryKey: ["products"] })
        toast.success({ msg: "Create order successfully" })
      },
      onError(error: any) {
        toast.error({ msg: error.description ? error.description : "Something went wrong" })
      },
    })

  const useUpdateOrderStatus = () =>
    useMutation({
      mutationFn: async ({ id, status }: { id: string; status: string }) => await BackendServices.updaetOrderStatus(id, status),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["orders"] })
        toast.success({ msg: "Update order successfully" })
      },
      onError(error: any) {
        toast.error({ msg: error.description ? error.description : "Something went wrong" })
      },
    })

  return { useOrderQuery, useCreateOrder, useUpdateOrderStatus }
}
