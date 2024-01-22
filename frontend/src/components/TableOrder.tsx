import { ActionIcon, Badge, Button, Flex, Group, Popover, Select, Text, Title } from "@mantine/core"
import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { useEffect, useState } from "react"
import sortBy from "lodash/sortBy"
import { IconChevronUp, IconEdit, IconEye, IconSelector, IconTrash } from "@tabler/icons-react"
import dayjs from "dayjs"
import { OrderTy } from "../types/order.type"
import { useNavigate } from "react-router-dom"

interface Props {
  data: Array<OrderTy>
  onEdit: (data: OrderTy) => void
}

const PAGE_SIZES = [10, 15, 20]

export default function TableOrder({ data, onEdit }: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1])

  const navigate = useNavigate()

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
          { title: "User", accessor: "userId.username", sortable: true },
          {
            title: "Total Amount",
            accessor: "totalAmount",
            sortable: true,
            render: ({ totalAmount }: OrderTy) => <>${totalAmount}</>,
          },
          {
            title: "Status",
            accessor: "status",
            textAlign: "center",
            sortable: true,
            render: ({ status }: OrderTy) => (
              <>
                {status === "pending" && <Badge color="yellow">{status}</Badge>}
                {status === "shipped" && <Badge color="blue">{status}</Badge>}
                {status === "delivered" && <Badge color="green">{status}</Badge>}
              </>
            ),
          },

          {
            title: "CreateAt",
            accessor: "createdAt",
            sortable: true,
            render: ({ createdAt }: OrderTy) => <>{dayjs(new Date(createdAt).toUTCString()).format("ddd, MMM D, YYYY h:mm A")}</>,
          },
          {
            title: "Action",
            accessor: "actions",
            textAlign: "center",
            render: (order) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon size="sm" variant="subtle" color="green" onClick={() => navigate("/order/" + order._id)}>
                  <IconEye size={16} />
                </ActionIcon>

                <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => onEdit(order)}>
                  <IconEdit size={16} />
                </ActionIcon>
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
