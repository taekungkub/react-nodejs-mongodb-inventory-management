import { useState } from "react"
import TableProduct from "../../components/TableProduct"
import useProduct from "../../hooks/use-product"
import { useDisclosure } from "@mantine/hooks"
import ModalFormProduct from "../../components/ModalFormProduct"
import { ProductTy } from "../../types/product.type"

type FormType = "ADD" | "EDIT"

export default function StockPage() {
  const [opened, { open, close }] = useDisclosure(false)
  const [type, setType] = useState<FormType>("ADD")
  const [selected, setSelected] = useState<ProductTy | undefined>(undefined)
  const { useProductQuery, useDeleteProduct } = useProduct()
  const { products } = useProductQuery()
  const onDeleteProductMutation = useDeleteProduct()

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
        onDelete={(data) => onDeleteProductMutation.mutate(data._id)}
      />
      <ModalFormProduct opened={opened} close={close} inititialForm={selected} type={type} />
    </div>
  )
}
