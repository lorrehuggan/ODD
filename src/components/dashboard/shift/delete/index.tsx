import { TrashIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { trpc } from "@utils/trpc";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

interface Props {
  shift: Shift | undefined;
}

const DeleteShift = ({ shift }: Props) => {
  const [open, setOpen] = useState(false);
  const utils = trpc.useContext();
  const deleteShift = trpc.shift.delete.useMutation({
    onSuccess: () => {
      utils.shift.getAll.invalidate();
      setOpen(false);
    },
  });

  const handleDelete = async () => {
    if (!shift?.id) return;
    await deleteShift.mutateAsync({ id: shift.id });
  };
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
      }}
    >
      <AlertDialog.Trigger asChild>
        <button className="rounded-md bg-base-dark-300 p-1">
          <TrashIcon className="h-4 w-4 text-base-light" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 animate-fade bg-base-dark/60 backdrop-blur-sm" />
        <AlertDialog.Content className="dashboard-container fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform animate-fade rounded bg-base-dark-200 p-4 text-base-light shadow-md">
          <AlertDialog.Title className="font-bold text-error">
            {" "}
            Are you sure you want to delete this shift?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-4 text-sm">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <div className="mt-4 flex items-center justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="rounded-md py-1 px-2 text-sm">Cancel</button>
            </AlertDialog.Cancel>
            <button
              disabled={deleteShift.isLoading}
              onClick={handleDelete}
              className="rounded-md bg-primary-dark py-1 px-2 text-sm text-primary"
            >
              {deleteShift.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteShift;
