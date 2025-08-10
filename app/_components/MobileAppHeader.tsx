import React, { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import ProfileAvatar from "./ProfileAvatar";
import { Menu } from "lucide-react";

function MobileAppHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div className="p-4 shadow-sm flex items-center justify-between w-full">
        {/* Button to open sidebar */}
        <button onClick={openSidebar} aria-label="Open sidebar">
          <Menu size={24} />
        </button>

        <ProfileAvatar />
      </div>

      {/* Render sidebar only if open */}
      {sidebarOpen && <MobileSidebar onClose={closeSidebar} />}
    </>
  );
}

export default MobileAppHeader;
