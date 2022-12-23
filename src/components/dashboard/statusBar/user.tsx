import {
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";

const User = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <UserIcon className="h-6 w-6 cursor-pointer" />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content className="mt-2 min-w-[200px] space-y-3 rounded bg-base-dark-300  p-2 tracking-wider shadow-outline">
        <DropdownMenu.Item className="flex items-center justify-between rounded py-2 pl-4 pr-2 hover:bg-base-dark-200 hover:outline-none">
          <span className="text-xs text-base-light">Profile</span>
          <UserIcon className="h-5 w-5 text-neutral-400" />
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => signOut()}
          className="flex items-center justify-between rounded py-2 pl-4 pr-2 hover:bg-base-dark-200 hover:outline-none"
        >
          <span className="text-xs text-base-light">Sign Out</span>
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-neutral-400" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default User;
