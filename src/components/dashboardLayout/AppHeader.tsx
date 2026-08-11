"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "./NavUser";

const AppHeader = () => {
  const user = {
    name: "Admin User",
    email: "admin@princeoochie.com",
    avatar: "https://github.com/shadcn.png",
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all duration-300">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <NavUser user={user} />
      </div>
    </header>
  );
};

export default AppHeader;