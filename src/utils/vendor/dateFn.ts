import type { Shift } from "@prisma/client";
import dayjs from "dayjs";
import { USD } from "@dinero.js/currencies";
import { dinero, toUnits } from "dinero.js";

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

// typed function that takes two date arguments to test if the first date is after the second date
export const isAfter = (date1: Date, date2: Date) => {
  return dayjs(date1).isAfter(date2);
};

//function that takes in an array of objects with a date property and money earned property and using dayjs returns a the percentage difference of money earned this week and last week

export const calculateWeeklyMoney = (shifts: Shift[]) => {
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

  console.log({ thisWeekMoney, lastWeekMoney, percentageChange });

  return { thisWeekMoney, lastWeekMoney, percentageChange };
};

//function that takes in an array of objects with a date property and money earned property and using dayjs returns a the percentage difference of money earned this month and last month

export const calculateMonthlyMoney = (shifts: Shift[]) => {
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

  return { thisMonthMoney, lastMonthMoney, percentageChange };
};
