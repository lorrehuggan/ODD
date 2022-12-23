import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import MonthlyRoundUp from "../shift/cards/roundup/month";
import AllShifts from "../shift/cards/shifts";
import { orderShiftsByDateDesc } from "@utils/vendor";
import CreateShiftCard from "../shift/cards/createShift";
import useCompany from "@utils/state/company";
import WeeklyRoundUp from "../shift/cards/roundup/weekly";

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
          <MonthlyRoundUp
            shifts={orderShiftsByDateDesc(allShifts.data)}
            isLoading={allShifts.isLoading}
            error={allShifts.error?.message}
          />
          <WeeklyRoundUp
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
