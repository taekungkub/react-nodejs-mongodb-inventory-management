import { TextInput, Button, Stack, Modal } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ProductSchema } from "../schemas/product.schema"
import { ProductTy } from "../types/product.type"
import { useEffect } from "react"
import useProduct from "../hooks/use-product"

type Props = {
  opened: boolean
  inititialForm?: ProductTy
  type: "ADD" | "EDIT"
  close: () => void
}

export default function ModalForm({ opened, close, inititialForm, type }: Props) {
  const { useAddProduct, useEditProduct } = useProduct()

  const onAddProductMutation = useAddProduct()
  const onEditProductMutation = useEditProduct()

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      stock: "",
      price: "",
    },
    validate: zodResolver(ProductSchema),
  })

  useEffect(() => {
    if (type === "ADD") {
      form.reset()
    } else if (type === "EDIT") {
      if (inititialForm) {
        form.setValues({ ...inititialForm, price: String(inititialForm.price), stock: String(inititialForm.stock) })
      }
    }
  }, [type, inititialForm])

  useEffect(() => {
    form.reset()
    close()
  }, [onAddProductMutation.isSuccess, onEditProductMutation.isSuccess])

  async function handleSubmit() {
    if (type === "ADD") {
      onAddProductMutation.mutate({
        ...form.values,
      })
    } else if (type === "EDIT") {
      onEditProductMutation.mutate({ id: String(inititialForm?._id), data: { ...form.values } })
    }
  }

  return (
    <div>
      <Modal opened={opened} onClose={close} title={type === "ADD" ? "Add" : "Edit"}>
        <form onSubmit={form.onSubmit(async (values) => handleSubmit())}>
          <Stack>
            <TextInput required label="Title" {...form.getInputProps("title")} radius="md" />
            <TextInput label="Description" {...form.getInputProps("description")} radius="md" />
            <TextInput type="number" required label="Stock" {...form.getInputProps("stock")} radius="md" />
            <TextInput type="number" required label="Price" {...form.getInputProps("price")} radius="md" />
          </Stack>
          <Button type="submit" fullWidth mt={"md"} loading={onAddProductMutation.isPending || onEditProductMutation.isPending}>
            {type === "ADD" ? "Add" : "Edit"}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
