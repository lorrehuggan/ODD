import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { calculateWeeklyEarnings } from "@utils/vendor";
import clsx from "clsx";

interface Props {
  shifts: Shift[];
}

const WeeklyPercentagePill = ({ shifts }: Props) => {
  const { percentIncreaseThisWeek, percentageChange } =
    calculateWeeklyEarnings(shifts);
  return (
    <span
      className={clsx(
        "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold",
        {
          "bg-primary-dark text-primary": percentIncreaseThisWeek,
          "bg-error-dark text-error ": !percentIncreaseThisWeek,
          "bg-info-dark text-info": percentageChange === "0%",
        }
      )}
    >
      <span>W</span>
      <span>{percentageChange}</span>
      <ArrowSmallUpIcon
        className={clsx(
          "h-3 w-3 transform transition-transform duration-200 ease-in-out",
          {
            "rotate-180": !percentIncreaseThisWeek,
            "rotate-0": percentIncreaseThisWeek,
            "rotate-90": percentageChange === "0%",
          }
        )}
      />
    </span>
  );
};

export default WeeklyPercentagePill;
