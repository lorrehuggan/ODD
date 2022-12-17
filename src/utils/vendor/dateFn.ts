import type { Shift } from "@prisma/client";
import dayjs from "dayjs";

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
