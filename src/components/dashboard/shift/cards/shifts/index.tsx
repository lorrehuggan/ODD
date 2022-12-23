import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDoubleUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import ShiftCard from "../shift";
import { trpc } from "@utils/trpc";
import type { Shift } from "@prisma/client";
import Button from "@components/ui/button/inde";
import useCompany from "@utils/state/company";
import CreateShift from "../../create";

interface Props {
  shifts: Shift[];
}

const AllShifts = ({ shifts }: Props) => {
  const [open, setOpen] = useState(false);
  const companyName = useCompany((state) => state.companyName);
  return (
    <div className="dashboard-container mt-4">
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className="rounded-md bg-base-dark-200"
      >
        <div className="flex justify-between  p-4">
          <div className="flex w-full justify-between border-b border-b-base-light/20 pb-4">
            <p className="text-sm font-semibold uppercase">{`${companyName} Shifts`}</p>
            <div className="flex items-center gap-2">
              <Collapsible.Trigger asChild>
                <Button theme="base-dark" disabled={shifts.length < 2}>
                  <ChevronDoubleUpIcon
                    title="Toggle More Shifts"
                    className={clsx(
                      "h-4 w-4 transition-transform duration-300 ease-in-out",
                      {
                        "rotate-[540deg] transform": open,
                        "rotate-0 transform": !open,
                      }
                    )}
                  />
                </Button>
              </Collapsible.Trigger>
              <CreateShift>
                <PlusIcon className="h-4 w-4" />
              </CreateShift>
            </div>
          </div>
        </div>
        <ShiftCard shift={shifts[0]} />
        <Collapsible.Content className="CollapsibleContent">
          {shifts.slice(1).map((shift) => {
            return <ShiftCard key={shift.id} shift={shift} />;
          })}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};

export default AllShifts;
