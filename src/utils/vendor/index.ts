import type { Shift } from "@prisma/client";
import dayjs from "dayjs";
import { USD } from "@dinero.js/currencies";
import { dinero, toDecimal, toUnits } from "dinero.js";

export const orderShiftsByDateAsc = (shifts: Shift[]) => {
  return shifts.sort((a, b) => {
    return dayjs(a.date).unix() - dayjs(b.date).unix();
  });
};

export const orderShiftsByDateDesc = (shifts: Shift[]) => {
  return shifts.sort((a, b) => {
    return dayjs(b.date).unix() - dayjs(a.date).unix();
  });
};

export const createTimeString = (time: Date) => {
  const hour = dayjs(time).hour();
  const minute = dayjs(time).minute();
  return `${hour}:${minute < 10 ? `0${minute}` : minute}`;
};

export const createDateString = (date: Date) => {
  const dateString = dayjs(date).format("DD/MM/YYYY");

  return dateString;
};

export const calculateHours = (start: Date, end: Date) => {
  const startHour = dayjs(start).hour();
  const startMinute = dayjs(start).minute();
  const endHour = dayjs(end).hour();
  const endMinute = dayjs(end).minute();

  const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const calculateMoneyPerHour = (start: Date, end: Date, wage: number) => {
  const hours = calculateHours(start, end);
  const hoursNumber = Number(hours.split("h")[0]);
  const unit = dinero({ amount: wage, currency: USD });
  const decimal = Number(toUnits(unit)[0]?.toFixed(2));
  const moneyPerHour = decimal / hoursNumber;

  return `$${moneyPerHour.toFixed(2)}`;
};

export const isAfter = (date1: Date, date2: Date) => {
  return dayjs(date1).isAfter(date2);
};

export const calculateWeeklyEarnings = (shifts: Shift[]) => {
  const thisWeek = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs(), "week");
  });

  const lastWeek = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs().subtract(1, "week"), "week");
  });

  const thisWeekMoney = thisWeek.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const lastWeekMoney = lastWeek.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const percentageChange =
    ((thisWeekMoney - lastWeekMoney) / lastWeekMoney) * 100;

  if (percentageChange === Infinity) {
    return {
      thisWeekMoney,
      lastWeekMoney,
      percentageChange: "100%",
      percentIncreaseThisWeek: true,
    };
  }

  if (isNaN(percentageChange)) {
    return {
      thisWeekMoney,
      lastWeekMoney,
      percentageChange: "0%",
      percentIncreaseThisWeek: false,
    };
  }

  return {
    thisWeekMoney,
    lastWeekMoney,
    percentageChange: `${percentageChange.toFixed(2)}%`,
    percentIncreaseThisWeek: percentageChange > 0,
  };
};

export const calculateMonthlyEarnings = (shifts: Shift[]) => {
  const thisMonth = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs(), "month");
  });

  const lastMonth = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs().subtract(1, "month"), "month");
  });

  const thisMonthMoney = thisMonth.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const lastMonthMoney = lastMonth.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const percentageChange =
    ((thisMonthMoney - lastMonthMoney) / lastMonthMoney) * 100;

  if (percentageChange === Infinity) {
    return {
      thisMonthMoney,
      lastMonthMoney,
      percentageChange: "100%",
      percentIncreaseThisMonth: true,
    };
  }

  if (isNaN(percentageChange)) {
    return {
      thisMonthMoney,
      lastMonthMoney,
      percentageChange: "0%",
      percentIncreaseThisMonth: false,
    };
  }
  return {
    thisMonthMoney,
    lastMonthMoney,
    percentageChange: `${percentageChange.toFixed(2)}%`,
    percentIncreaseThisMonth: percentageChange > 0,
  };
};

export const calculateYearlyEarnings = (shifts: Shift[]) => {
  const thisYear = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs(), "year");
  });

  const lastYear = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs().subtract(1, "year"), "year");
  });

  const thisYearMoney = thisYear.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const lastYearMoney = lastYear.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const percentageChange =
    ((thisYearMoney - lastYearMoney) / lastYearMoney) * 100;

  const _thisYearMoney = dinero({
    amount: thisYearMoney,
    currency: USD,
    scale: 2,
  });

  if (percentageChange === Infinity) {
    return {
      thisYearMoney: `$${toDecimal(_thisYearMoney)}`,
      lastYearMoney,
      percentageChange: "100%",
      percentIncreaseThisYear: true,
    };
  }

  if (isNaN(percentageChange)) {
    return {
      thisYearMoney: `$${toDecimal(_thisYearMoney)}`,
      lastYearMoney,
      percentageChange: "0%",
      percentIncreaseThisYear: false,
    };
  }
  return {
    thisYearMoney: `$${toDecimal(_thisYearMoney)}`,
    lastYearMoney,
    percentageChange: `${percentageChange.toFixed(2)}%`,
    percentIncreaseThisYear: percentageChange > 0,
  };
};

export const weeklyAndMonthylEarnings = (shifts: Shift[]) => {
  const thisWeek = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs(), "week");
  });

  const lastWeek = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs().subtract(1, "week"), "week");
  });

  const thisMonth = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs(), "month");
  });

  const lastMonth = shifts.filter((shift) => {
    return dayjs(shift.date).isSame(dayjs().subtract(1, "month"), "month");
  });

  const thisWeekMoney = thisWeek.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const lastWeekMoney = lastWeek.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const thisMonthMoney = thisMonth.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  const lastMonthMoney = lastMonth.reduce((acc, shift) => {
    return acc + shift.earnings;
  }, 0);

  return {
    thisWeekMoney,
    lastWeekMoney,
    thisMonthMoney,
    lastMonthMoney,
  };
};

/**
 * "Convert cents to dollars and add a dollar sign."
 *
 * The function takes a number of cents and returns a string of dollars
 * @param {number} cents - number - The number of cents to convert to currency.
 * @returns A string that is the dollar amount of the cents passed in.
 */
export const centsToCurrency = (cents: number) => {
  const dollars = (cents / 100).toFixed(2);
  return `$ ${dollars}`;
};

/**
 * It takes an array of shifts, loops through them, and adds up the earnings
 * @param {Shift[]} shifts - Shift[]
 * @returns A string that is the total earnings of all the shifts in the array.
 */
export const calculateTotalToString = (shifts: Shift[]): string => {
  let total = 0;
  shifts.forEach((shift) => {
    total += shift.earnings;
  });
  const unit = dinero({ amount: total, currency: USD, scale: 2 });
  return `$${toDecimal(unit)}`;
};

/**
 * It takes an array of Shift objects, loops through them, and adds up the earnings property of each
 * Shift object
 * @param {Shift[]} shifts - Shift[] - an array of Shift objects
 * @returns A function that takes in an array of shifts and returns the total earnings of all the
 * shifts.
 */
export const calculateTotal = (shifts: Shift[]) => {
  let total = 0;
  shifts.forEach((shift) => {
    total += shift.earnings;
  });
  const unit = dinero({ amount: total, currency: USD, scale: 2 });
  return Number(toDecimal(unit));
};
