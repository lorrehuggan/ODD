import { signOut, useSession } from "next-auth/react";

const StatusBar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="bg-base-dark-200 py-2 px-8 w-screen flex justify-between items-center">
      <div>
        <span className="text-sm">{sessionData?.user?.name}</span>
      </div>
      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  )
}

export default StatusBar 
