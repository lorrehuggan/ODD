import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import CollapsibleCard from "../cards/collapisble";
import { trpc } from "@utils/trpc";
import type { Shift } from "@prisma/client";

interface Props {
  shifts: Shift[];
}

const CollapsibleShifts = ({ shifts }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="dashboard-container mt-4">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <div className="mb-4 flex justify-between">
          <p className="text-sm uppercase">My Shifts</p>
          <Collapsible.Trigger asChild>
            <button className="rounded-full bg-base-light p-1">
              <ChevronDoubleUpIcon
                title="Toggle More Shifts"
                className={clsx(
                  "h-4 w-4 text-base-dark transition-transform duration-200 ease-in-out",
                  {
                    "rotate-180 transform": open,
                    "rotate-0 transform": !open,
                  }
                )}
              />
            </button>
          </Collapsible.Trigger>
        </div>
        <CollapsibleCard shift={shifts[0]} />
        <Collapsible.Content>
          {shifts.slice(1).map((shift) => {
            return <CollapsibleCard key={shift.id} shift={shift} />;
          })}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};

export default CollapsibleShifts;
