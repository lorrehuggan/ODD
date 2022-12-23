import { TrashIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { centsToCurrency } from "@utils/vendor";
import { vendor } from "@utils/vendor";
import DeleteShift from "../../delete";

interface Props {
  shift: Shift | undefined;
}

const ShiftCard = ({ shift }: Props) => {
  const { createDateString, calculateMoneyPerHour } = vendor;

  return (
    <div className=" relative rounded-md bg-base-dark-200 p-4 ">
      {shift && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded p-1 text-xs tracking-widest text-base-dark-400">
              {createDateString(shift?.date)}
            </span>
            <div className="flex items-center gap-2">
              <DeleteShift shift={shift}>
                <TrashIcon className="h-4 w-4" />
              </DeleteShift>
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

export default ShiftCard;
