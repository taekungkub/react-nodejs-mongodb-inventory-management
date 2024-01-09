import { TextInput, Button, Stack, Modal } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ProductSchema } from "../../../schemas/product.schema"
import { ProductTy } from "../../../types/product.type"
import { useEffect } from "react"
import BackendServices from "../../../services/BackendServices"
import useToast from "../../../hooks/use-toast"

type Props = {
  opened: boolean
  close: () => void
  inititialForm?: ProductTy
  type: "ADD" | "EDIT"
  onSuccess: () => void
}

export default function ModalForm({ opened, close, inititialForm, type, onSuccess }: Props) {
  const toast = useToast()

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

  async function handleSubmit() {
    try {
      if (type === "ADD") {
        await BackendServices.createProduct(form.values.title, form.values.description, Number(form.values.stock))
        toast.success({ msg: "Create product successfully" })
        onSuccess()
        form.reset()
      } else if (type === "EDIT") {
        console.log(inititialForm)
        const res = await BackendServices.editProduct(inititialForm?._id, form.values.title, form.values.description, Number(form.values.stock))
        console.log(res)
        toast.success({ msg: "Update product successfully" })
        onSuccess()
      }
    } catch (error: any) {
      toast.error({ msg: error.description ? error.description : "Something went wrong" })
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
          <Button type="submit" fullWidth mt={"md"}>
            Add
          </Button>
        </form>
      </Modal>
    </div>
  )
}
