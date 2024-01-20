import BackendServices from "../services/BackendServices";
import useToast from "../hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategorySchema } from "../validation/product.schema";
import { z } from "zod";

export default function useCategory() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const useCategoryQuery = () =>
    useQuery({
      queryKey: ["category"],
      queryFn: async () => await BackendServices.category(),
      select: (res) => res.data.data,
    });

  const useAddCategory = () =>
    useMutation({
      mutationFn: async (data: z.infer<typeof CategorySchema>) =>
        await BackendServices.createCategory(data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
        toast.success({ msg: "Create category successfully" });
      },
      onError(error: any) {
        toast.error({
          msg: error.description ? error.description : "Something went wrong",
        });
      },
    });

  const useUpdateCategory = () =>
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: z.infer<typeof CategorySchema>;
      }) => await BackendServices.updateCategory(id, data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
        toast.success({ msg: "Update category successfully" });
      },
      onError(error: any) {
        console.log(error);
        toast.error({
          msg: error.description ? error.description : "Something went wrong",
        });
      },
    });

  const useDeleteCategory = () =>
    useMutation({
      mutationFn: async (id: string) =>
        await BackendServices.deleteCategory(id),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
      },
      onError(error: any) {
        toast.error({
          msg: error.description ? error.description : "Something went wrong",
        });
      },
    });

  return {
    useCategoryQuery,
    useAddCategory,
    useUpdateCategory,
    useDeleteCategory,
  };
}
