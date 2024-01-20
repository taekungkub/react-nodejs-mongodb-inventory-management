import { TextInput, Button, Stack, Modal, Switch } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ProductSchema } from "../validation/product.schema";
import { ProductTy } from "../types/product.type";
import { useEffect, useState } from "react";
import useProduct from "../hooks/use-product";

type Props = {
  opened: boolean;
  inititialForm?: ProductTy;
  type: "ADD" | "EDIT";
  close: () => void;
};

export default function ModalForm({
  opened,
  close,
  inititialForm,
  type,
}: Props) {
  const { useAddProduct, useEditProduct } = useProduct();

  const onAddProductMutation = useAddProduct();
  const onEditProductMutation = useEditProduct();

  const form = useForm<any>({
    initialValues: {
      title: "",
      description: "",
      stock: "",
      price: "",
      status: false,
    },
    validate: zodResolver(ProductSchema),
  });

  useEffect(() => {
    if (type === "ADD") {
      form.reset();
    } else if (type === "EDIT") {
      if (inititialForm) {
        form.setValues({
          ...inititialForm,
        })
      }
    }
  }, [type, inititialForm]);

  useEffect(() => {
    form.reset();
    close();
  }, [onAddProductMutation.isSuccess, onEditProductMutation.isSuccess]);

  async function handleSubmit() {
    if (type === "ADD") {
      onAddProductMutation.mutate({
        ...form.values,
      });
    } else if (type === "EDIT") {
      onEditProductMutation.mutate({
        id: String(inititialForm?._id),
        data: { ...form.values },
      });
    }
  }



  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={type === "ADD" ? "Add" : "Edit"}
      >
        <form onSubmit={form.onSubmit(async (values) => handleSubmit())}>
          <Stack>
            <TextInput
              required
              label="Title"
              {...form.getInputProps("title")}
              radius="md"
            />
            <TextInput
              label="Description"
              {...form.getInputProps("description")}
              radius="md"
            />
            <TextInput
              type="number"
              required
              label="Stock"
              {...form.getInputProps("stock")}
              radius="md"
            />
            <TextInput
              type="number"
              required
              label="Price"
              {...form.getInputProps("price")}
              radius="md"
            />
            <Switch {...form.getInputProps('status', { type: 'checkbox' })}  label="Status" />
          </Stack>
          <Button
            type="submit"
            fullWidth
            mt={"md"}
            loading={
              onAddProductMutation.isPending || onEditProductMutation.isPending
            }
          >
            {type === "ADD" ? "Add" : "Edit"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
