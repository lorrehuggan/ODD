import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import { calculateMonthlyEarnings } from "@utils/vendor";
import clsx from "clsx";

interface Props {
  shifts: Shift[];
}

const MonthlyPercentPill = ({ shifts }: Props) => {
  const { percentageChange, percentIncreaseThisMonth } =
    calculateMonthlyEarnings(shifts);

  return (
    <span
      className={clsx(
        "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold",
        {
          "bg-primary-dark text-primary": percentIncreaseThisMonth,
          "bg-error-dark text-error ": !percentIncreaseThisMonth,
          "bg-info-dark text-info": percentageChange === "0%",
        }
      )}
    >
      <span>M</span>
      <span>{percentageChange}</span>
      <ArrowSmallUpIcon
        className={clsx(
          "h-3 w-3 transform transition-transform duration-200 ease-in-out",
          {
            "rotate-180": !percentIncreaseThisMonth,
            "rotate-0": percentIncreaseThisMonth,
            "rotate-90": percentageChange === "0%",
          }
        )}
      />
    </span>
  );
};

export default MonthlyPercentPill;
