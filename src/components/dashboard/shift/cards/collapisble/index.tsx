import type { Shift } from "@prisma/client";
import { centsToCurrency } from "@utils/vendor";
import { createDateString, calculateMoneyPerHour } from "@utils/vendor";

interface Props {
  shift: Shift | undefined;
}

const CollapsibleCard = ({ shift }: Props) => {
  return (
    <div className="mb-4 rounded-md bg-base-dark-200 p-4 shadow-md">
      {shift && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded p-1 text-xs tracking-widest">
              {createDateString(shift?.date)}
            </span>
            <span className="rounded py-1 text-xs tracking-widest">
              {`${calculateMoneyPerHour(
                shift.start,
                shift.end,
                shift.earnings
              )} p/h`}
            </span>
          </div>
          <div>
            <span className="text-xl font-bold">
              {centsToCurrency(shift.earnings)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CollapsibleCard;
