import { useState } from "react"
import TableProduct from "../../features/Product/components/TableProduct"
import useProduct from "../../features/Product/hooks/use-product"
import { useDisclosure } from "@mantine/hooks"
import ModalForm from "../../features/Product/components/ModalForm"
import { ProductTy } from "../../types/product.type"

type FormType = "ADD" | "EDIT"

export default function ProductsPage() {
  const [opened, { open, close }] = useDisclosure(false)
  const [type, setType] = useState<FormType>("ADD")
  const [selected, setSelected] = useState<ProductTy | undefined>(undefined)

  const { useProductQuery, onDelete } = useProduct()
  const { products } = useProductQuery()

  function handleAdd() {
    setType("ADD")
    open()
  }

  function handleEdit(payload: ProductTy) {
    setSelected(payload)
    setType("EDIT")
    open()
  }

  return (
    <div>
      <TableProduct
        data={products || []}
        onAdd={() => handleAdd()}
        onEdit={(selected) => handleEdit(selected)}
        onDelete={(data) => onDelete(data._id)}
      />
      <ModalForm opened={opened} close={close} inititialForm={selected} type={type} />
    </div>
  )
}
