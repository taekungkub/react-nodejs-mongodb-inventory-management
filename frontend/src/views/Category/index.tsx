import { Button, Flex, Title } from "@mantine/core";
import React, { useState } from "react";
import useCategory from "../../hooks/use-category";
import TableCategory from "../../components/TableCategory";
import { useDisclosure } from "@mantine/hooks";
import { CategoryTy } from "../../types/product.type";
import ModalFormCategory from "../../components/ModalFormCategory";

type Props = {};
type FormType = "ADD" | "EDIT";

export default function CategoryPage({}: Props) {
  const { useCategoryQuery, useDeleteCategory } = useCategory();
  const categoryQuery = useCategoryQuery();
  const onDeleteCateguryMutation = useDeleteCategory();

  const [opened, { open, close }] = useDisclosure(false);
  const [type, setType] = useState<FormType>("ADD");
  const [selected, setSelected] = useState<CategoryTy | undefined>(undefined);

  function handleAdd() {
    setType("ADD");
    open();
  }

  function handleEdit(payload: CategoryTy) {
    setSelected(payload);
    setType("EDIT");
    open();
  }

  return (
    <div>
      <Flex justify={"space-between"} align={"center"} mb={"md"} gap={"md"}>
        <Title order={3}>Category</Title>
        <Button onClick={() => handleAdd()}>Add</Button>
      </Flex>
      <TableCategory
        data={categoryQuery.data || []}
        onEdit={(selected) => handleEdit(selected)}
        onDelete={(data) => onDeleteCateguryMutation.mutate(String(data._id))}
      />

      <ModalFormCategory
        opened={opened}
        close={close}
        inititialForm={selected}
        type={type}
      />
    </div>
  );
}
