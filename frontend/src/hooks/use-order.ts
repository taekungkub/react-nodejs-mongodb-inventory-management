import BackendServices from "../services/BackendServices"
import useToast from "../hooks/use-toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProductSchema } from "../schemas/product.schema"
import { z } from "zod"

export default function useProduct() {
  const toast = useToast()
  const queryClient = useQueryClient()

  const useOrderQuery = () =>
    useQuery({
      queryKey: ["orders"],
      queryFn: async () => await BackendServices.products(),
      select: (res) => res.data.data,
    })

  const useAddOrder = () =>
    useMutation({
      mutationFn: async (data: z.infer<typeof ProductSchema>) => await BackendServices.createOrders(),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["orders"] })
        toast.success({ msg: "Create order successfully" })
      },
      onError(error: any) {
        toast.error({ msg: error.description ? error.description : "Something went wrong" })
      },
    })

  return { useOrderQuery, useAddOrder }
}
