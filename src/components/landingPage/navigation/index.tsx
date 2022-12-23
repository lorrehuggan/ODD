import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@components/ui/button/inde";

const Navigation = () => {
  return (
    <nav className="flex items-center py-6">
      <div className="landing-container relative flex justify-between rounded-md bg-base-dark-200 p-4 shadow-xl">
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-primary sm:block">
          Public Beta
        </div>
        <h1 className="font-mono text-2xl font-black italic">ODD</h1>
        <ul className="flex items-center gap-3">
          <li>
            <Button
              theme="base-dark"
              onClick={() => signIn()}
              className="cursor-pointer bg-base-dark-200 p-1 text-sm transition-colors duration-300 ease-in-out hover:text-primary"
            >
              Sign In
            </Button>
          </li>
          <li>
            <a className="cursor-pointer rounded-md bg-primary-dark p-2 text-sm transition-colors duration-300 ease-in-out hover:bg-primary">
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
