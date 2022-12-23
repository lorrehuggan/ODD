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
        "flex items-center gap-1 rounded-md bg-base-dark px-2 py-1 text-xs font-bold text-base-light"
      }
    >
      <span
        className={clsx("", {
          "text-red-500": !percentIncreaseThisWeek,
          "text-green-500": percentIncreaseThisWeek,
        })}
      >
        {percentageChange}
      </span>
      <ArrowSmallUpIcon
        className={clsx(
          "h-3.5 w-3.5 transform transition-transform duration-200 ease-in-out",
          {
            "rotate-[135deg] text-red-500": !percentIncreaseThisWeek,
            "rotate-45 text-green-500": percentIncreaseThisWeek,
            "rotate-90 text-white": percentageChange === "0%",
          }
        )}
      />
    </span>
  );
};

export default WeeklyPercentagePill;
