import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import ShiftTable from "../shift/table";
import ShiftRoundUp from "../shift/cards/roundup";
import CollapsibleShifts from "../shift/collapsibleShifts";
import { orderShiftsByDateDesc } from "@utils/vendor";
import CreateShiftCard from "../shift/cards/createShift";

interface Props {
  isLoading: boolean;
  companyId: string;
}
const Board = ({ isLoading, companyId }: Props) => {
  const { data: sessionData } = useSession();
  const allShifts = trpc.shift.getAll.useQuery({ companyId });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="pt-4">
      <CreateShiftCard companyID={companyId} />
      {allShifts.data && (
        <>
          <ShiftRoundUp
            shifts={orderShiftsByDateDesc(allShifts.data)}
            isLoading={allShifts.isLoading}
            error={allShifts.error?.message}
          />
          <CollapsibleShifts shifts={allShifts.data} />
        </>
      )}
      {/* <div className="dashboard-container">
        <ShiftTable
          shifts={allShifts.data}
          isLoading={allShifts.isLoading}
          error={allShifts.error?.message}
        />
      </div> */}
    </section>
  );
};

export default Board;
