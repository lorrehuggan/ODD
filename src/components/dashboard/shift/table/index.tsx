import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import type { Shift } from "@prisma/client";
import { trpc } from "@utils/trpc";
import {
  centsToCurrency,
  calculateHours,
  calculateMoneyPerHour,
  createDateString,
  createTimeString,
  orderShiftsByDateDesc,
} from "@utils/vendor";
import autoAnimate from "@formkit/auto-animate";

interface Props {
  shifts: Shift[] | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
}

const ShiftTable = ({ shifts, isLoading, error }: Props) => {
  const parent = useRef(null);
  const utils = trpc.useContext();
  const deleteShift = trpc.shift.delete.useMutation({
    onSuccess: () => {
      utils.shift.getAll.invalidate();
    },
  });

  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, {
        duration: 500,
        easing: "ease-in-out",
      });
  }, [parent]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (shifts?.length === 0 && !isLoading)
    return (
      <div className="text-center">
        <p className="text-2xl font-bold">No shifts found</p>
        <p className="text-sm">Add a shift to get started</p>
      </div>
    );

  const handleDelete = async (id: string) => {
    deleteShift.mutate({ id });
  };

  return (
    <div className=" mt-8 rounded-md bg-base-dark-200 p-4 pb-6">
      <div className="">
        <h4 className="text-2xl font-bold">Shifts Details</h4>
      </div>
      <table className="w-full table-fixed">
        <thead className="">
          <tr className="border-b">
            <th className="text-base-dark-100 whitespace-nowrap py-4 text-left text-sm">
              Shift hrs
            </th>
            <th className="text-base-dark-100 whitespace-nowrap py-4 text-left text-sm">
              $ per/h
            </th>
            <th className="text-base-dark-100 whitespace-nowrap py-4 text-left text-sm">
              Date
            </th>
            <th className="text-base-dark-100 whitespace-nowrap py-4 text-left text-sm">
              Earnings
            </th>
            <th className="text-base-dark-100 whitespace-nowrap py-4 text-left text-sm sm:w-20"></th>
          </tr>
        </thead>
        {shifts && (
          <tbody className="">
            {orderShiftsByDateDesc(shifts).map((shift) => (
              <tr key={shift.id} className="text-sm">
                <td className="whitespace-nowrap border-b py-4">
                  {calculateHours(shift.start, shift.end)}
                </td>
                <td className="whitespace-nowrap border-b py-4">
                  {calculateMoneyPerHour(
                    shift.start,
                    shift.end,
                    shift.earnings
                  )}
                </td>
                <td className="whitespace-nowrap border-b py-4">
                  {createDateString(shift.date)}
                </td>
                <td className="whitespace-nowrap border-b py-4 font-bold text-primary">
                  <span className="rounded-full bg-primary p-1.5 tracking-wider text-primary-dark">
                    {centsToCurrency(shift.earnings)}
                  </span>
                </td>
                <td className="flex justify-center whitespace-nowrap border-b py-4 font-bold ">
                  {deleteShift.isLoading ? (
                    <ArrowPathIcon className="h-5 w-5 animate-spin cursor-not-allowed text-base-light" />
                  ) : (
                    <TrashIcon
                      onClick={() => handleDelete(shift.id)}
                      className="h-5 w-5 cursor-pointer"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ShiftTable;
