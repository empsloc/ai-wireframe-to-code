import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import Authentication from "./Authentication";
import { useAuthContext } from "../provider";
import { Button } from "@/components/ui/button";

function AppHeader({ hideSidebar = false }) {
  const user = useAuthContext();
  return (
    <div className="p-4 shadow-sm flex items-center justify-between w-full">
      {!hideSidebar && <SidebarTrigger />}
      <div className="flex items-center gap-x-4">
        {!user?.user?.email ? (
          <Authentication>
            <div className="flex items-center gap-x-2 cursor-pointer font-medium text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500">
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              <Button size="sm">Get Started</Button>
            </div>
          </Authentication>
        ) : (
          <div>
            asd
          <ProfileAvatar />
          </div>
        )}
      </div>
    </div>
  );
}

export default AppHeader;
