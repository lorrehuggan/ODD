import type { Shift } from "@prisma/client";

// function that converts cents to currency and returns a number.
export const centsToCurrency = (cents: number) => {
  const dollars = (cents / 100).toFixed(2);
  return `$ ${dollars}`;
};

//function that calculates the total of all shifts and returns a number.
export const calculateTotal = (shifts: Shift[]) => {
  let total = 0;
  shifts.forEach((shift) => {
    total += shift.earnings;
  });
  return total;
};
