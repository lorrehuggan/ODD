import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";
import type { Shift } from "@prisma/client";
import clsx from "clsx";
import { vendor } from "@utils/vendor";

interface Props {
  shifts: Shift[];
}

const MonthlyPercentPill = ({ shifts }: Props) => {
  const { percentageChange, percentIncreaseThisMonth } =
    vendor.calculateMonthlyEarnings(shifts);

  return (
    <span
      className={
        "flex items-center gap-1 rounded-md bg-base-dark px-2 py-1 text-xs font-bold "
      }
    >
      <span
        className={clsx("", {
          "text-red-500": !percentIncreaseThisMonth,
          "text-green-500": percentIncreaseThisMonth,
        })}
      >
        {percentageChange}
      </span>
      <ArrowSmallUpIcon
        className={clsx(
          "h-3.5 w-3.5 transform transition-transform duration-200 ease-in-out",
          {
            "rotate-[135deg] text-red-500": !percentIncreaseThisMonth,
            "rotate-45 text-green-500": percentIncreaseThisMonth,
            "rotate-90 text-white": percentageChange === "0%",
          }
        )}
      />
    </span>
  );
};

export default MonthlyPercentPill;
