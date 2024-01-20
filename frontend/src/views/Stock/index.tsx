import { useState } from "react";
import TableProduct from "../../components/TableProduct";
import useProduct from "../../hooks/use-product";
import { useDisclosure } from "@mantine/hooks";
import ModalFormProduct from "../../components/ModalFormProduct";
import { ProductTy } from "../../types/product.type";
import { StatsGridStock } from "../../components/StatsGridStock/StatsGridStock";
import useDashboard from "../../hooks/use-dashboard";
import useCategory from "../../hooks/use-category";

type FormType = "ADD" | "EDIT";

export default function StockPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [type, setType] = useState<FormType>("ADD");
  const [selected, setSelected] = useState<ProductTy | undefined>(undefined);
  const { useProductQuery, useDeleteProduct } = useProduct();
  const { products } = useProductQuery();
  const onDeleteProductMutation = useDeleteProduct();
  const {useCategoryQuery} =useCategory();

  const categoryQuery = useCategoryQuery()

  function handleAdd() {
    setType("ADD");
    open();
  }

  function handleEdit(payload: ProductTy) {
    setSelected(payload);
    setType("EDIT");
    open();
  }

  const { useDashboardStockQuery } = useDashboard();

  const dashboardStockQuery = useDashboardStockQuery();

  return (
    <div>
      <StatsGridStock data={dashboardStockQuery.data || []} />

      <br />
      <TableProduct
        data={products || []}
        onAdd={() => handleAdd()}
        onEdit={(selected) => handleEdit(selected)}
        onDelete={(data) => onDeleteProductMutation.mutate(data._id)}
      />
      <ModalFormProduct
        opened={opened}
        close={close}
        inititialForm={selected}
        type={type}
        categories={ categoryQuery.data || []}
      />
    </div>
  );
}
