import {
  ArrowPathIcon,
  MinusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { trpc } from "@utils/trpc";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import Button from "@components/ui/button/inde";

interface Props {
  shift: Shift | undefined;
  children?: React.ReactNode;
}

const DeleteShift = ({ shift, children }: Props) => {
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
        <Button theme="base-dark">{children}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 animate-fade bg-base-dark/60 backdrop-blur-sm" />
        <AlertDialog.Content className="dashboard-container fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform animate-fade rounded bg-base-dark-200 p-4 text-base-light shadow-md">
          <AlertDialog.Title className="text-lg font-bold ">
            {" "}
            Are you sure you want to delete this shift?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-neutral-400">
            This action cannot be undone. This will permanently delete the
            record of this shift from our database.
          </AlertDialog.Description>
          <div className="mt-8 flex items-center justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button theme="base-neutral">Cancel</Button>
            </AlertDialog.Cancel>
            <Button
              disabled={deleteShift.isLoading}
              onClick={handleDelete}
              theme="primary"
            >
              {deleteShift.isLoading ? (
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
              ) : null}
              Confirm
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteShift;
