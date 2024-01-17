import { Title } from "@mantine/core"
import React from "react"
import useOrder from "../../hooks/use-order"
import TableOrder from "../../components/TableOrder"

type Props = {}

export default function OrderPage({}: Props) {
  const { useOrderQuery } = useOrder()

  const { data } = useOrderQuery()
  return (
    <div>
      {JSON.stringify(data)}
      <TableOrder data={data || []} />
    </div>
  )
}
