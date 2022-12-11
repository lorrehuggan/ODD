import { signOut, useSession } from "next-auth/react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

const StatusBar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex h-12 w-screen items-center justify-between bg-base-dark-200 px-8">
      <div className="flex items-center gap-1">
        <FaceSmileIcon className="h-5 w-5" />
        <span className="text-sm">{sessionData?.user?.name}</span>
      </div>
      <div>
        <button
          className="color-trans text-sm hover:text-primary"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
