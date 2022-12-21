import { signOut, useSession } from "next-auth/react";
import {
  Bars3Icon,
  UserIcon,
  BellAlertIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const StatusBar = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="flex h-20 w-screen items-center justify-between bg-base-dark-200">
      <div className="dashboard-container flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm font-black">{`Hello, ${sessionData?.user?.name}`}</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="" onClick={() => signOut()}>
            <PlusIcon className="h-6 w-6" />
          </button>
          <button>
            <UserIcon className="h-6 w-6" />
          </button>
          <button>
            <BellAlertIcon className="h-6 w-6 text-red-500" />
          </button>
          <button>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StatusBar;
