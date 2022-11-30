import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"

const Navigation = () => {
  return (
    <nav className="flex items-center py-6">
      <div className="landing-container flex justify-between relative bg-base-dark-200 p-4 rounded-full shadow-xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 uppercase text-sm text-primary">Public Beta</div>
        <h1 className="font-black font-mono italic text-2xl">ODD</h1>
        <ul className='flex gap-3 items-center'>
          <li>
            <button onClick={() => signIn()} className="p-1 text-sm cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out">Sign In</button>
          </li>
          <li>
            <a className='p-2 bg-primary text-sm rounded-full hover:bg-primary-dark transition-colors duration-300 ease-in-out cursor-pointer'>Get Started</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
