import { useEffect, useState } from "react"
import TableProduct from "../../features/Product/components/TableProduct"
import useProduct from "../../features/Product/hooks/use-product"
import { useDisclosure } from "@mantine/hooks"
import ModalForm from "../../features/Product/components/ModalForm"
import { ProductTy } from "../../types/product.type"
import BackendServices from "../../services/BackendServices"
import useToast from "../../hooks/use-toast"

type Props = {}
type FormType = "ADD" | "EDIT"

export default function ProductsPage({}: Props) {
  const { onGetProducts, products } = useProduct()
  const [opened, { open, close }] = useDisclosure(false)
  const [type, setType] = useState<FormType>("ADD")
  const [selected, setSelected] = useState<ProductTy | undefined>(undefined)

  const toast = useToast()

  useEffect(() => {
    onGetProducts()
  }, [])

  function handleAdd() {
    setType("ADD")
    open()
  }

  function handleEdit(payload: ProductTy) {
    setSelected(payload)
    setType("EDIT")
    open()
  }

  async function handleSuccess() {
    close()
    onGetProducts()
  }

  async function handleDelete(data: ProductTy) {
    try {
      const res = await BackendServices.deleteProduct(data._id)
      onGetProducts()
    } catch (error: any) {
      toast.error({ msg: error.description ? error.description : "Something went wrong" })
    }
  }

  return (
    <div>
      <TableProduct open={open} data={products || []} onAdd={() => handleAdd()} onEdit={(selected) => handleEdit(selected)} onDelete={(data) => handleDelete(data)} />
      <ModalForm opened={opened} close={close} inititialForm={selected} type={type} onSuccess={() => handleSuccess()} />
    </div>
  )
}
