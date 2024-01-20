import BackendServices from "../services/BackendServices";
import useToast from "../hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { CreateUserSchema } from "../validation/user.schema";

export default function useUser() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const useUsersQuery = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: async () => await BackendServices.users(),
      select: (res) => res.data.data,
    });

  const useUserQuery = (id: string) =>
    useQuery({
      queryKey: ["user", id],
      queryFn: async () => await BackendServices.user(id),
      select: (res) => res.data.data,
    });

  const useAddUser = () =>
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: z.infer<typeof CreateUserSchema>;
      }) => await BackendServices.createUser(id, data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success({ msg: "Create user successfully" });
      },
      onError(error: any) {
        toast.error({
          msg: error.description ? error.description : "Something went wrong",
        });
      },
    });

  const useUpdateUser = () =>
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: z.infer<typeof CreateUserSchema>;
      }) => await BackendServices.updateUser(id, data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success({ msg: "Update user successfully" });
      },
      onError(error: any) {
        console.log(error);
        toast.error({
          msg: error.description ? error.description : "Something went wrong",
        });
      },
    });

  const useDeleteUser = () =>
    useMutation({
      mutationFn: async (id: string) => await BackendServices.deleteUser(id),
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError(error: any) {
        toast.error({
          msg: error.description ? error.description : "Something went wrong",
        });
      },
    });

  return {
    useUsersQuery,
    useUserQuery,
    useAddUser,
    useUpdateUser,
    useDeleteUser,
  };
}
