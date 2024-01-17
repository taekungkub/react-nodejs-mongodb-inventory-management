import React, { useEffect, useState } from "react"
import { OrderTy } from "../types/order.type"
import { Button, Modal, Select, Stack } from "@mantine/core"
import useOrder from "../hooks/use-order"

type Props = {
  opened: boolean
  inititialForm?: OrderTy
  close: () => void
}

export default function ModalFormOrder({ opened, inititialForm, close }: Props) {
  const [value, setValue] = useState<string | null>(null)

  function handleSubmit(e: any) {
    e.preventDefault()
    close()
  }

  const { useUpdateOrderStatus } = useOrder()

  const updateOrderStatusMutation = useUpdateOrderStatus()

  useEffect(() => {
    setValue(String(inititialForm?.status || "pending"))
  }, [inititialForm?.status])

  return (
    <Modal opened={opened} onClose={close} title="Edit">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack>
          <Select
            data={[
              { value: "pending", label: "Pending" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
            ]}
            value={inititialForm?.status}
            onChange={(_value, option) => setValue(option.value)}
          />
        </Stack>
        <Button
          type="submit"
          fullWidth
          mt={"md"}
          onClick={() => updateOrderStatusMutation.mutate({ id: String(inititialForm?._id), status: String(value) })}
        >
          Edit
        </Button>
      </form>
    </Modal>
  )
}
