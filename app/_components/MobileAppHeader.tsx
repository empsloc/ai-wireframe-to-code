import React, { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import ProfileAvatar from "./ProfileAvatar";
import { Menu } from "lucide-react";
import Authentication from "./Authentication";
import { useAuthContext } from "../provider";

function MobileAppHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthContext();
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div className="p-4 shadow-sm flex items-center justify-between w-full">
        {/* Button to open sidebar */}
        <button onClick={openSidebar} aria-label="Open sidebar">
          <Menu size={24} />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
          {!user?.user?.email ? (
            <Authentication>
              <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500">
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
                Get Started
              </div>
            </Authentication>
          ) : (
            <ProfileAvatar />
          )}
        </div>
      </div>

      {/* Render sidebar only if open */}
      {sidebarOpen && <MobileSidebar onClose={closeSidebar} />}
    </>
  );
}

export default MobileAppHeader;
