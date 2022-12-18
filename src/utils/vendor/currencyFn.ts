// function that converts cents to currency and returns a number.
export const centsToCurrency = (cents: number) => {
  const dollars = (cents / 100).toFixed(2);
  return `$ ${dollars}`;
};
