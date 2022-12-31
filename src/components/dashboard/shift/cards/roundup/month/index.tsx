import MonthlyPercentPill from "@components/dashboard/ui/monthlyPercentPill";
import Button from "@components/ui/button/inde";
import { Bars2Icon, Bars3Icon, PlusIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { vendor } from "@utils/vendor";

interface Props {
  shifts: Shift[];
  isLoading: boolean;
  error: string | null | undefined;
}

const MonthlyRoundUp = ({ shifts }: Props) => {
  const { thisMonthMoney } = vendor.calculateMonthlyEarnings(shifts);
  const { percentageChange, percentIncreaseThisMonth } =
    vendor.calculateMonthlyEarnings(shifts);
  return (
    <div className="dashboard-container relative mt-4 flex max-w-full flex-col space-y-4 rounded-md bg-primary p-4 text-base-dark">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wide text-base-light">
          This Month
        </span>
        <div className="flex items-center gap-2">
          <MonthlyPercentPill shifts={shifts} />
          <Button theme="base-dark">
            <Bars2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-bold text-base-light">{`$${thisMonthMoney.formatted}`}</h4>
      </div>
      <div>
        {percentageChange === "0%" ? (
          <p className="text-sm font-semibold text-base-light">
            There has been no change bteween this month and last month
          </p>
        ) : (
          <p className="text-sm font-semibold text-base-light">
            {percentIncreaseThisMonth
              ? `This month you have seen a ${percentageChange} increase in your earnings compared to last month`
              : `This month you have seen a ${
                  percentageChange.split("-")[1]
                } decrease in your earnings compared to last month`}
          </p>
        )}
      </div>
    </div>
  );
};

export default MonthlyRoundUp;
