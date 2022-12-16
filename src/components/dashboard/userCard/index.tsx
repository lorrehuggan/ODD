import { ArrowRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UserCard = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="dashboard-container flex items-center gap-4 rounded-lg bg-base-dark-200 p-4">
      <div className="flex">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg">
          <Image
            src={sessionData?.user?.image || "/images/user.png"}
            alt="User profile image"
            className=""
            fill
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <h5 className="font-semibold">{sessionData?.user?.name}</h5>
        <p className="mt-1 text-xs text-base-dark-400">
          Delivery Driver / Uber East
        </p>
        <div className="mt-4 flex gap-2">
          <button className="color-trans flex items-center gap-1 rounded bg-base-dark-300 py-1 px-2 text-xs hover:bg-base-dark">
            <ArrowRightIcon className="h-4 w-4" />
            Sign Out
          </button>
          <button className="color-trans flex items-center gap-1 rounded bg-primary py-1 px-2 text-xs hover:bg-primary-dark">
            <PlusIcon className="h-4 w-4" />
            Add Shift
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
