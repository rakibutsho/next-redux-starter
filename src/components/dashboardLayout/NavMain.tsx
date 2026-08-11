"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  title,
  items,
}: {
  title?: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    onClick?: () => void;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {title && (
        <SidebarGroupLabel className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          {title}
        </SidebarGroupLabel>
      )}
      <SidebarMenu>
        {items.map((item) => {
          const active =
            item.isActive ||
            pathname === item.url ||
            pathname.startsWith(`${item.url}/`);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                onClick={item.onClick}
                isActive={active}
                className={`group/nav-item relative h-10 w-full rounded-lg px-3 transition-all duration-150
                  ${
                    active
                      ? "bg-[#4F46E5] text-white shadow-sm shadow-[#4F46E5]/30 hover:bg-[#4338CA] hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon
                      className={`h-[18px] w-[18px] shrink-0 ${active ? "text-gray-500" : "text-gray-500 group-hover/nav-item:text-gray-700"}`}
                    />
                  )}
                  <span className="truncate text-[13.5px] font-medium">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
