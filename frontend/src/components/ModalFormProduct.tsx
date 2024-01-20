import { TextInput, Button, Stack, Modal, Switch, Select } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ProductSchema } from "../validation/product.schema";
import { CategoryTy, ProductTy } from "../types/product.type";
import { useEffect, useState } from "react";
import useProduct from "../hooks/use-product";

type Props = {
  opened: boolean;
  inititialForm?: ProductTy;
  type: "ADD" | "EDIT";
  close: () => void;
  categories: CategoryTy[]
};

export default function ModalForm({
  opened,
  close,
  inititialForm,
  type,
  categories
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
      category:''
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
          category:inititialForm.category?._id
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
                  <Select 
                  
                  label='Category'
                  data={categories.length ? categories.map((v)=> {
                    return {
                      value:v._id || '',
                      label:v.title || ''
                    }
                  }) : []}
                  {...form.getInputProps('category')}

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
