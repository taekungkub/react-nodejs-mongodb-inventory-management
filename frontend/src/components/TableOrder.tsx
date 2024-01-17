import { ActionIcon, Button, Flex, Group, Popover, Text, Title } from "@mantine/core"
import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { useEffect, useState } from "react"
import sortBy from "lodash/sortBy"
import { IconChevronUp, IconEdit, IconEye, IconSelector, IconTrash } from "@tabler/icons-react"
import dayjs from "dayjs"
import { OrderTy } from "../types/order.type"

interface Props {
  data: Array<OrderTy>
  onEdit: (data: OrderTy) => void
  onAdd: () => void
  onDelete: (data: OrderTy) => void
}

const PAGE_SIZES = [10, 15, 20]

export default function TableOrder({ data, onEdit, onAdd, onDelete }: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1])

  useEffect(() => {
    setPage(1)
  }, [pageSize])

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<OrderTy>>({ columnAccessor: "#", direction: "asc" })
  const [records, setRecords] = useState(sortBy(data.slice(0, pageSize), "_id"))

  useEffect(() => {
    const myData = sortBy(data, sortStatus.columnAccessor)

    setRecords(sortStatus.direction === "desc" ? myData.reverse() : myData)
  }, [sortStatus, data])

  useEffect(() => {
    const from = (page - 1) * pageSize
    const to = from + pageSize
    setRecords(data.slice(from, to))
  }, [page, pageSize])

  return (
    <>
      <Flex justify={"space-between"} align={"center"} mb={"md"} gap={"md"}>
        <Title order={3}>Order List</Title>
      </Flex>
      <DataTable
        idAccessor="_id"
        withTableBorder
        withColumnBorders
        striped
        highlightOnHover
        textSelectionDisabled
        mih={100}
        records={records}
        columns={[
          {
            title: "#",
            accessor: "_id",
            textAlign: "center",
            sortable: true,
          },
          { title: "Title", accessor: "title", sortable: true },

          {
            title: "TotalAmount",
            accessor: "totalAmount",
            sortable: true,
            render: ({ totalAmount }: OrderTy) => <>${totalAmount}</>,
          },
          {
            title: "createdAt",
            accessor: "createdAt",
            sortable: true,
            render: ({ createdAt }: OrderTy) => <>{dayjs(new Date(createdAt).toUTCString()).format("ddd, MMM D, YYYY h:mm A")}</>,
          },
          {
            title: "Action",
            accessor: "actions",
            textAlign: "center",

            render: (product) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon size="sm" variant="subtle" color="green">
                  <IconEye size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => onEdit(product)}>
                  <IconEdit size={16} />
                </ActionIcon>
                <Popover width={200} position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <ActionIcon size="sm" variant="subtle" color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Text ta={"center"} size="xs">
                      Are you sure you want to delete
                    </Text>
                    <Flex justify={"center"} gap={"md"} mt={"sm"}>
                      <Button variant="default" size="xs">
                        Cancel
                      </Button>
                      <Button color="red" size="xs" onClick={() => onDelete(product)}>
                        Delete
                      </Button>
                    </Flex>
                  </Popover.Dropdown>
                </Popover>
              </Group>
            ),
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        sortIcons={{
          sorted: <IconChevronUp size={16} />,
          unsorted: <IconSelector size={16} />,
        }}
        totalRecords={data.length}
        paginationActiveBackgroundColor="grape"
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </>
  )
}
