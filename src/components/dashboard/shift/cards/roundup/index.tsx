import {
  ArrowSmallUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { calculateTotal } from "@utils/vendor/currencyFn";
import { calculateWeeklyMoney } from "@utils/vendor/dateFn";

interface Props {
  shifts: Shift[] | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
}

const ShiftRoundUp = ({ shifts }: Props) => {
  return (
    <div className="dashboard-container mt-4 flex max-w-full flex-col space-y-4 rounded-md bg-base-dark-200 p-4">
      <div className="flex items-center gap-2">
        <div className=" rounded-lg bg-base-dark-300 p-1">
          <CurrencyDollarIcon className="h-5 w-5 text-primary" />
        </div>
        {shifts && (
          <span className="text-xs text-primary">
            {calculateWeeklyMoney(shifts).percentageChange}
          </span>
        )}
        <span className="rounded-full bg-primary p-[1px]">
          <ArrowSmallUpIcon className="h-3 w-3 text-primary-dark" />
        </span>
      </div>
      <div>
        {shifts && (
          <h4 className="text-3xl font-bold">{calculateTotal(shifts)}</h4>
        )}
      </div>
      <div>
        <span className="text-sm text-base-dark-400">Total Revenue</span>
      </div>
    </div>
  );
};

export default ShiftRoundUp;
