import { Button, Flex, Title } from "@mantine/core";
import React, { useState } from "react";
import TableUser from "../../components/TableUser";
import useUser from "../../hooks/use-user";
import DrawerFormUser from "../../components/DrawerFormUser";
import { useDisclosure } from "@mantine/hooks";
import { UserTy } from "../../types/user.type";

type FormType = "ADD" | "EDIT";

export default function UserPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [type, setType] = useState<FormType>("ADD");
  const [selected, setSelected] = useState<UserTy | undefined>(undefined);

  const { useUsersQuery, useDeleteUser } = useUser();
  const usersQuery = useUsersQuery();
  const onDeleteUsertMutation = useDeleteUser();
  return (
    <div>
      <Flex justify={"space-between"} align={"center"} mb={"md"} gap={"md"}>
        <Title order={3}>Users</Title>
        <Button onClick={()=> {
           setType("ADD");
           open();
        }}>Add</Button>
      </Flex>

      <br />

      <TableUser
        data={usersQuery.data || []}
        onDelete={(data) => onDeleteUsertMutation.mutate(data._id)}
        onEdit={(payload) => {
          setSelected(payload);
          setType("EDIT");
          open();
        }}
      />
      <DrawerFormUser
        opened={opened}
        close={close}
        inititialForm={selected}
        type={type}
      />
    </div>
  );
}
