import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import AddShift from "../createShift";

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
        <small>{JSON.stringify(allShifts.data, null, 2)}</small>
      </div>
    </section>
  );
};

export default Board;
