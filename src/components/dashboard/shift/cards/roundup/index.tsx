import MonthlyPercentPill from "@components/dashboard/ui/monthlyPercentPill";
import WeeklyPercentagePill from "@components/dashboard/ui/weeklyPercentPill";
import type { Shift } from "@prisma/client";
import { vendor } from "@utils/vendor";

interface Props {
  shifts: Shift[];
  isLoading: boolean;
  error: string | null | undefined;
}

const ShiftRoundUp = ({ shifts }: Props) => {
  const { thisMonthMoney } = vendor.calculateMonthlyEarnings(shifts);
  const { percentageChange, percentIncreaseThisMonth } =
    vendor.calculateMonthlyEarnings(shifts);
  return (
    <div className="dashboard-container relative mt-4 flex max-w-full flex-col space-y-4 rounded-md bg-primary p-4 text-base-dark">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wide text-base-dark-200">
          This Month
        </span>
        <div className="flex items-center gap-2">
          <WeeklyPercentagePill shifts={shifts} />
          <MonthlyPercentPill shifts={shifts} />
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-bold text-base-light">{`$${thisMonthMoney.formatted}`}</h4>
      </div>
      <div>
        <p className="text-sm font-semibold text-base-light">
          {percentIncreaseThisMonth
            ? `This month you have seen a ${percentageChange} increase in your earnings over last month`
            : `This month you have seen a ${
                percentageChange.split("-")[1]
              } decrease in your earnings last month`}
        </p>
      </div>
    </div>
  );
};

export default ShiftRoundUp;
