import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import AddShift from "../createShift";
import ShiftTable from "../shift/table";

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
      <AddShift companyID={companyId} />
      <div className="dashboard-container">
        <ShiftTable
          shifts={allShifts.data}
          isLoading={allShifts.isLoading}
          error={allShifts.error?.message}
        />
      </div>
    </section>
  );
};

export default Board;
