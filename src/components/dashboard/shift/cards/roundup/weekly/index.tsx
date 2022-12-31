import WeeklyPercentagePill from "@components/dashboard/ui/weeklyPercentPill";
import Button from "@components/ui/button/inde";
import { Bars2Icon, Bars3Icon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { vendor } from "@utils/vendor";

interface Props {
  shifts: Shift[];
  isLoading: boolean;
  error: string | null | undefined;
}

const WeeklyRoundUp = ({ shifts }: Props) => {
  const { thisWeekMoney } = vendor.calculateWeeklyEarnings(shifts);
  const { percentageChange, percentIncreaseThisWeek } =
    vendor.calculateWeeklyEarnings(shifts);
  return (
    <div className="dashboard-container relative mt-4 flex max-w-full flex-col space-y-4 rounded-md bg-secondary p-4 text-base-dark">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wide text-base-light">
          This Week
        </span>
        <div className="flex items-center gap-2">
          <WeeklyPercentagePill shifts={shifts} />
          <Button theme="base-dark">
            <Bars2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-bold text-base-light">{`$${thisWeekMoney.formatted}`}</h4>
      </div>
      <div>
        {percentageChange === "0%" ? (
          <p className="text-sm font-semibold text-base-light">
            There has been no change bteween this week and last week
          </p>
        ) : (
          <p className="text-sm font-semibold text-base-light">
            {percentIncreaseThisWeek
              ? `This week you have seen a ${percentageChange} increase in your earnings compared to last week`
              : `This week you have seen a ${
                  percentageChange.split("-")[1]
                } decrease in your earnings compared to last week`}
          </p>
        )}
      </div>
    </div>
  );
};

export default WeeklyRoundUp;
