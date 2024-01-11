import { TextInput, Button, Stack, Modal } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ProductSchema } from "../../../schemas/product.schema"
import { ProductTy } from "../../../types/product.type"
import { useEffect } from "react"
import useProduct from "../hooks/use-product"

type Props = {
  opened: boolean
  inititialForm?: ProductTy
  type: "ADD" | "EDIT"
  close: () => void
}

export default function ModalForm({ opened, close, inititialForm, type }: Props) {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      stock: "",
    },
    validate: zodResolver(ProductSchema),
  })

  useEffect(() => {
    if (type === "ADD") {
      form.reset()
    } else if (type === "EDIT") {
      if (inititialForm) {
        form.setValues({ title: inititialForm.title, description: inititialForm.description, stock: String(inititialForm.stock) })
      }
    }
  }, [type, inititialForm])

  const { onAddProduct, isLoadingAdd, isSuccessAdd, onEditProduct, isLoadingEdit, isSuccessEdit } = useProduct()

  useEffect(() => {
    form.reset()
    close()
  }, [isSuccessAdd, isSuccessEdit])

  async function handleSubmit() {
    if (type === "ADD") {
      onAddProduct({
        ...form.values,
      })
    } else if (type === "EDIT") {
      onEditProduct({ id: String(inititialForm?._id), data: { ...form.values } })
    }
  }

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Add">
        <form onSubmit={form.onSubmit(async (values) => handleSubmit())}>
          <Stack>
            <TextInput required label="Title" {...form.getInputProps("title")} radius="md" />
            <TextInput label="Description" {...form.getInputProps("description")} radius="md" />
            <TextInput type="number" required label="Stock" {...form.getInputProps("stock")} radius="md" />
          </Stack>
          <Button type="submit" fullWidth mt={"md"} loading={isLoadingAdd || isLoadingEdit}>
            {type === "ADD" ? "Add" : "Edit"}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
