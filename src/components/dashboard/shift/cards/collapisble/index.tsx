import { TrashIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { centsToCurrency } from "@utils/vendor";
import { createDateString, calculateMoneyPerHour } from "@utils/vendor";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import DeleteShift from "../../delete";

interface Props {
  shift: Shift | undefined;
}

const CollapsibleCard = ({ shift }: Props) => {
  return (
    <div className=" rounded-md bg-base-dark-200 p-4 shadow-md">
      {shift && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded p-1 text-xs tracking-widest text-base-dark-400">
              {createDateString(shift?.date)}
            </span>
            <div className="flex items-center gap-2">
              <DeleteShift shift={shift} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">
              {centsToCurrency(shift.earnings)}
            </span>
            <span className=" text-sm tracking-wide text-secondary">
              {`${calculateMoneyPerHour(
                shift.start,
                shift.end,
                shift.earnings
              )} p/h`}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CollapsibleCard;
