import type { Shift } from "@prisma/client";
import { centsToCurrency } from "@utils/vendor/currencyFn";
import {
  calculateHours,
  calculateMoneyPerHour,
  createDateString,
  createTimeString,
  orderShiftsByDateDesc,
} from "@utils/vendor/dateFn";

interface Props {
  shifts: Shift[] | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
}

const ShiftTable = ({ shifts, isLoading, error }: Props) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (shifts?.length === 0 && !isLoading)
    return (
      <div className="text-center">
        <p className="text-2xl font-bold">No shifts found</p>
        <p className="text-sm">Add a shift to get started</p>
      </div>
    );

  return (
    <table className=" w-full table-fixed">
      <thead className="py-2">
        <tr className="border-b py-2">
          <th className="py-4 text-left text-sm">Hours</th>
          <th className="py-4 text-left text-sm">Hours</th>
          <th className="py-4 text-left text-sm">Start</th>
          <th className="py-4 text-left text-sm">End</th>
          <th className="py-4 text-left text-sm">Date</th>
          <th className="py-4 text-left text-sm">Earnings</th>
        </tr>
      </thead>
      {shifts && (
        <tbody className="bg-base-dark-200">
          {orderShiftsByDateDesc(shifts).map((shift) => (
            <tr key={shift.id} className="text-sm">
              <td className="border-b py-3">
                {calculateHours(shift.start, shift.end)}
              </td>
              <td className="border-b py-3">
                {calculateMoneyPerHour(shift.start, shift.end, shift.earnings)}
              </td>
              <td className="border-b py-3">{createTimeString(shift.start)}</td>
              <td className="border-b py-3">{createTimeString(shift.end)}</td>
              <td className="border-b py-3">{createDateString(shift.date)}</td>
              <td className="border-b py-3 font-bold text-primary">
                {centsToCurrency(shift.earnings)}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default ShiftTable;
