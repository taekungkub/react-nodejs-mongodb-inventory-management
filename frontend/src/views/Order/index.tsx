import { Title } from "@mantine/core"
import React, { useState } from "react"
import useOrder from "../../hooks/use-order"
import TableOrder from "../../components/TableOrder"
import ModalFormOrder from "../../components/ModalFormOrder"
import { useDisclosure } from "@mantine/hooks"
import { OrderTy } from "../../types/order.type"

type Props = {}

export default function OrderPage({}: Props) {
  const { useOrdersQuery } = useOrder()
  const { data } = useOrdersQuery()
  const [opened, { open, close }] = useDisclosure(false)
  const [selected, setSelected] = useState<OrderTy | undefined>(undefined)

  function handleEdit(payload: OrderTy) {
    setSelected(payload)
    open()
  }

  return (
    <div>
      <TableOrder data={data || []} onEdit={(order) => handleEdit(order)} />
      <ModalFormOrder opened={opened} close={close} inititialForm={selected} />
    </div>
  )
}
