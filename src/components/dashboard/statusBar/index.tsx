import { signOut, useSession } from "next-auth/react";
import {
  Bars3Icon,
  UserIcon,
  BellAlertIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import CreateShift from "../shift/create";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import User from "./user";

const StatusBar = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="flex h-20 w-screen items-center justify-between bg-base-dark-200">
      <div className="dashboard-container flex items-center justify-between">
        <div className="flex items-center font-bold">
          <span className="">O</span>
          <span className="text-xl">D</span>
          <span>D</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <CreateShift>
            <PlusIcon className="h-6 w-6" />
          </CreateShift>
          <User />
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
