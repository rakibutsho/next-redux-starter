"use client";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import * as React from "react";

export function TeamSwitcher({
  teams,
}: {
  teams: { name: string; logo: React.ElementType }[];
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    roleLabel?: string;
  };
}) {
  const [activeTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarHeader className="border-b border-gray-100">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="cursor-default select-none hover:bg-transparent active:bg-transparent py-4"
          >
            {/* Icon — always visible in icon-only mode */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-sm font-bold text-white shadow-sm shadow-[#4F46E5]/30">
              G
            </div>
            {/* Text — auto-hidden by Shadcn in icon-only mode */}
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-gray-900 tracking-tight">
                Guicopay
              </span>
              <span className="text-[11px] text-gray-400 font-normal mt-0.5">
                Dashboard
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
