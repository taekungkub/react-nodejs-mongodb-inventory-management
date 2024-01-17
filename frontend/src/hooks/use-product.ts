import BackendServices from "../services/BackendServices"
import useToast from "../hooks/use-toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProductSchema } from "../schemas/product.schema"
import { z } from "zod"

export default function useProduct() {
  const toast = useToast()
  const queryClient = useQueryClient()

  function useProductQuery() {
    const {
      isLoading,
      isFetched,
      data: products,
    } = useQuery({
      queryKey: ["products"],
      queryFn: async () => await BackendServices.products(),
      select: (res) => res.data.data,
    })

    return {
      isLoading,
      isFetched,
      products,
    }
  }

  const useAddProduct = () =>
    useMutation({
      mutationFn: async (data: z.infer<typeof ProductSchema>) => await BackendServices.createProduct(data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["products"] })
        toast.success({ msg: "Create product successfully" })
      },
      onError(error: any) {
        toast.error({ msg: error.description ? error.description : "Something went wrong" })
      },
    })

  const useEditProduct = () =>
    useMutation({
      mutationFn: async ({ id, data }: { id: string; data: z.infer<typeof ProductSchema> }) => await BackendServices.editProduct(id, data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["products"] })
        toast.success({ msg: "Update product successfully" })
      },
      onError(error: any) {
        toast.error({ msg: error.description ? error.description : "Something went wrong" })
      },
    })

  const useDeleteProduct = () =>
    useMutation({
      mutationFn: async (id: string) => await BackendServices.deleteProduct(id),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["products"] })
      },
      onError(error: any) {
        toast.error({ msg: error.description ? error.description : "Something went wrong" })
      },
    })

  return { useProductQuery, useAddProduct, useEditProduct, useDeleteProduct }
}
