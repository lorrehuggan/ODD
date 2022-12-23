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
      className={
        "flex items-center gap-1 rounded-md bg-base-dark-300 px-2 py-1 text-xs font-bold text-base-light"
      }
    >
      <span>W</span>
      <span>{percentageChange}</span>
      <ArrowSmallUpIcon
        className={clsx(
          "h-3 w-3 transform transition-transform duration-200 ease-in-out",
          {
            "rotate-180 text-red-500": !percentIncreaseThisWeek,
            "rotate-0 text-green-500": percentIncreaseThisWeek,
            "rotate-90 text-white": percentageChange === "0%",
          }
        )}
      />
    </span>
  );
};

export default WeeklyPercentagePill;
