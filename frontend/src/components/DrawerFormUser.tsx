import React, { useEffect } from "react";
import { UserTy } from "../types/user.type";
import { useForm, zodResolver } from "@mantine/form";
import { CreateUserSchema } from "../validation/user.schema";
import useUser from "../hooks/use-user";
import {
  Button,
  Drawer,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";

type Props = {
  opened: boolean;
  inititialForm?: UserTy;
  type: "ADD" | "EDIT";
  close: () => void;
};

export default function DrawerFormUser({
  opened,
  inititialForm,
  type,
  close,
}: Props) {
  const form = useForm<any>({
    initialValues: {
      username: "",
      password: "",
      email: "",
      role: "",
    },
    validate: zodResolver(CreateUserSchema),
  });

  useEffect(() => {
    if (type === "ADD") {
      form.reset();
    } else if (type === "EDIT") {
      if (inititialForm) {
        form.setValues({
          ...inititialForm,
        });
      }
    }
  }, [type, inititialForm]);

  const { useAddUser, useUpdateUser } = useUser();
  const onAddUserMutation = useAddUser();
  const onEditUserMutation = useUpdateUser();

  async function handleSubmit() {
    if (type === "ADD") {
      onAddUserMutation.mutate({
        ...form.values,
      });
    } else if (type === "EDIT") {
      onEditUserMutation.mutate({
        id: String(inititialForm?._id),
        data: { ...form.values },
      });
    }
    close();
  }

  return (
    <div>
      <Drawer opened={opened} onClose={close} title="Manage User" position={'right'}>
        <form onSubmit={form.onSubmit(async (values) => handleSubmit())}>
          <Stack>
            <TextInput
              required
              label="Username"
              {...form.getInputProps("username")}
              radius="md"
            />
            <TextInput
              label="Email"
              {...form.getInputProps("email")}
              radius="md"
            />
            <PasswordInput
              required
              label="Password"
              {...form.getInputProps("password")}
              radius="md"
            />

            <Select
              required
              label="Role"
              data={["user", "admin"]}
              {...form.getInputProps("role")}
            />
          </Stack>

          <Button
            type="submit"
            fullWidth
            mt={"md"}
            loading={
              onAddUserMutation.isPending || onEditUserMutation.isPending
            }
          >
            {type === "ADD" ? "Add" : "Edit"}
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
