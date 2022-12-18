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

  return moneyPerHour;
};
