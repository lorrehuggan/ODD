import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import ShiftRoundUp from "../shift/cards/roundup";
import AllShifts from "../shift/cards/shifts";
import { orderShiftsByDateDesc } from "@utils/vendor";
import CreateShiftCard from "../shift/cards/createShift";
import useCompany from "@utils/state/company";

interface Props {
  isLoading: boolean;
}
const Board = ({ isLoading }: Props) => {
  const { data: sessionData } = useSession();
  const companyID = useCompany((state) => state.companyID);
  const allShifts = trpc.shift.getAll.useQuery({ companyId: companyID });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="pt-4">
      {allShifts.data && (
        <>
          <ShiftRoundUp
            shifts={orderShiftsByDateDesc(allShifts.data)}
            isLoading={allShifts.isLoading}
            error={allShifts.error?.message}
          />
          <AllShifts shifts={allShifts.data} />
        </>
      )}
    </section>
  );
};

export default Board;
