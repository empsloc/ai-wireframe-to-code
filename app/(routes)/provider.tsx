"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../provider";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import axios from "axios";
import AppHeader from "../_components/AppHeader";
import { AppSidebar } from "../_components/AppSidebar";
import MobileAppHeader from "../_components/MobileAppHeader";

function DashboardProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthContext();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Auth check + user validation
  useEffect(() => {
    if (!user?.user && user.user) return router.replace("/");

    if (user?.user) checkUser();
  }, [user]);

  const checkUser = async () => {
    await axios.post("/api/user", {
      userName: user?.user?.displayName,
      userEmail: user?.user?.email,
    });
  };

  // Detect mobile viewport
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    onResize(); // Initial check
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (isMobile) {
    // Mobile layout: no SidebarProvider
    return (
      <div className="flex flex-col w-full min-h-screen">
        <MobileAppHeader />
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }

  // Desktop layout: with SidebarProvider
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <main className="flex-1 flex flex-col">
          <AppHeader />
          <div className="p-10 flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;

