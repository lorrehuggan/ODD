import { useSession } from "next-auth/react";
import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import UserCard from "../userCard";

interface Props {
  isLoading: boolean;
}
const Board = ({ isLoading }: Props) => {
  const { data: sessionData } = useSession();
  const companies = trpc.company.getAll.useQuery();
  if (isLoading) return <p>Loading...</p>;
  return <section className="pt-4"></section>;
};

export default Board;
