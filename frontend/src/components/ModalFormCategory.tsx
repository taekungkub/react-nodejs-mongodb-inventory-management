import { useEffect } from "react";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { CategoryTy } from "../types/product.type";
import { useForm, zodResolver } from "@mantine/form";
import { CategorySchema } from "../validation/product.schema";
import useCategory from "../hooks/use-category";

type Props = {
  opened: boolean;
  inititialForm?: CategoryTy;
  type: "ADD" | "EDIT";
  close: () => void;
};

export default function ModalFormCategory({
  opened,
  inititialForm,
  close,
  type,
}: Props) {
  const { useAddCategory, useUpdateCategory } = useCategory();

  const onAddCategoryMutation = useAddCategory();
  const onUpdateCategoryMutation = useUpdateCategory();

  const form = useForm<any>({
    initialValues: {
      title: "",
      description: "",
    },
    validate: zodResolver(CategorySchema),
  });

  useEffect(() => {
    if (type === "ADD") {
      form.reset();
    } else if (type === "EDIT") {
      if (inititialForm) {
        form.setValues({
          ...inititialForm,
        })
      }
    }
  }, [type, inititialForm]);

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();

      if (type === "ADD") {
        onAddCategoryMutation.mutate({...form.values});
        form.reset();
      } else {
        onUpdateCategoryMutation.mutate({
          id: String(inititialForm?._id),
          data: { ...form.values },
        });
      }
      close();
    } catch (error) {}
  }

  return (
    <Modal opened={opened} onClose={close} title="Edit">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack>
          <TextInput
            required
            label="Title"
            {...form.getInputProps("title")}
            radius="md"
          />
           <TextInput
            
            label="Description"
            {...form.getInputProps("description")}
            radius="md"
          />
        </Stack>
        <Button type="submit" fullWidth mt={"md"}>
          {type === 'ADD' ? 'Add' : 'Edit'}
        </Button>
      </form>
    </Modal>
  );
}
