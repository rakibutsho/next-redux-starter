"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/useLogout";
import { CircleUser, KeyRound, LogOut } from "lucide-react";
import Link from "next/link";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { handleLogoutClick } = useLogout();

  const fallback = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 cursor-pointer h-auto hover:bg-gray-50 data-[state=open]:bg-gray-100 transition-colors duration-150"
            >
              <Avatar className="h-8 w-8 rounded-full ring-2 ring-gray-100">
                <AvatarImage
                  src={user.avatar || "https://github.com/shadcn.png"}
                  alt={user.name}
                />
                <AvatarFallback className="bg-[#4F46E5] text-white text-xs font-semibold">
                  {fallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left leading-tight">
                <span className="truncate text-[13px] font-semibold text-gray-900">
                  {user.name}
                </span>
                <span className="truncate text-[11px] text-gray-400">
                  {user.email}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-black/[0.06]"
            side="bottom"
            align="end"
            sideOffset={6}
          >
            {/* User info header */}
            <DropdownMenuLabel className="px-2 py-2.5 font-normal">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-full ring-2 ring-gray-100">
                  <AvatarImage
                    src={user.avatar || "https://github.com/shadcn.png"}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-[#4F46E5] text-white text-sm font-semibold">
                    {fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className="text-[13.5px] font-semibold text-gray-900">
                    {user.name}
                  </span>
                  <span className="text-[11.5px] text-gray-400 mt-0.5">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-1 bg-gray-100" />

            {/* Navigation links */}
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 focus:bg-gray-50 gap-3 font-medium">
              <Link href="/dashboard/profile">
                <CircleUser className="h-4 w-4 text-gray-400 shrink-0" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 focus:bg-gray-50 gap-3 font-medium">
              <Link href="/dashboard/change-password">
                <KeyRound className="h-4 w-4 text-gray-400 shrink-0" />
                Change Password
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 bg-gray-100" />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogoutClick}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-[13px] font-medium text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-500 gap-3"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}