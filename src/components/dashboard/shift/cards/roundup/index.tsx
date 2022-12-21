import MonthlyPercentPill from "@components/dashboard/ui/monthlyPercentPill";
import WeeklyPercentagePill from "@components/dashboard/ui/weeklyPercentPill";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { calculateYearlyEarnings } from "@utils/vendor";

interface Props {
  shifts: Shift[];
  isLoading: boolean;
  error: string | null | undefined;
}

const ShiftRoundUp = ({ shifts }: Props) => {
  const { thisYearMoney } = calculateYearlyEarnings(shifts);
  return (
    <div className="dashboard-container relative mt-4 flex max-w-full flex-col space-y-4 rounded-md bg-base-dark-200 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm tracking-wide text-base-dark-400">
          Year Total
        </span>
        <div className="flex items-center gap-2">
          <WeeklyPercentagePill shifts={shifts} />
          <MonthlyPercentPill shifts={shifts} />
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-bold">{thisYearMoney}</h4>
      </div>
    </div>
  );
};

export default ShiftRoundUp;
