import { ActionIcon, Badge, Button, Flex, Group, Popover, Select, Text, Title } from "@mantine/core"
import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { useEffect, useState } from "react"
import sortBy from "lodash/sortBy"
import { IconChevronUp, IconEdit, IconEye, IconSelector, IconTrash } from "@tabler/icons-react"
import dayjs from "dayjs"
import { OrderTy } from "../types/order.type"
import { CategoryTy } from "../types/product.type"

interface Props {
  data: Array<CategoryTy>
  onEdit: (data: CategoryTy) => void
  onDelete: (data: CategoryTy) => void;
}

const PAGE_SIZES = [10, 15, 20]

export default function TableCategory({ data, onEdit  , onDelete}: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1])

  useEffect(() => {
    setPage(1)
  }, [pageSize])

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<CategoryTy>>({ columnAccessor: "#", direction: "asc" })
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
          { title: "Title", accessor: "title", sortable: true},
          { title: "Description", accessor: "description", sortable: true},

          {
            title: "Action",
            accessor: "actions",
            textAlign: "center",
            render: (category) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon size="sm" variant="subtle" color="green">
                  <IconEye size={16} />
                </ActionIcon>

                <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => onEdit(category)}>
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
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => onDelete(category)}
                      >
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
