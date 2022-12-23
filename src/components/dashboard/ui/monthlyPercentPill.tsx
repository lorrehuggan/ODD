import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { calculateMonthlyEarnings } from "@utils/vendor";
import clsx from "clsx";
import { vendor } from "@utils/vendor";

interface Props {
  shifts: Shift[];
}

const MonthlyPercentPill = ({ shifts }: Props) => {
  const { percentageChange, percentIncreaseThisMonth } =
    calculateMonthlyEarnings(shifts);

  return (
    <span
      className={
        "flex items-center gap-1 rounded-md bg-base-light px-2 py-1 text-xs font-bold "
      }
    >
      <span>M</span>
      <span>{percentageChange}</span>
      <ArrowSmallUpIcon
        className={clsx(
          "h-3 w-3 transform transition-transform duration-200 ease-in-out",
          {
            "rotate-180 text-red-500": !percentIncreaseThisMonth,
            "rotate-0 text-green-500": percentIncreaseThisMonth,
            "rotate-90 text-white": percentageChange === "0%",
          }
        )}
      />
    </span>
  );
};

export default MonthlyPercentPill;
