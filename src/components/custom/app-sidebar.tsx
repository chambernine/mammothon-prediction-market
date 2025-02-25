"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavHistory } from "./nav-history";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { sidebarData } from "../../data/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const router = useRouter();

  const isExpanded = state === "expanded";

  const handleClickCreatePoll = () => {
    router.push("/poll/create-poll");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center w-full mt-20">
            <Button
              variant={"ghost"}
              className="rounded-lg text-[14px] font-semibold backdrop-blur-md
                                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100
                                text-black dark:text-white transition-all duration-300
                                group-hover:-translate-y-0.2 border border-black/10 dark:border-white/10
                                hover:shadow-md dark:hover:shadow-neutral-800/50"
              onClick={handleClickCreatePoll}
            >
              <Plus className="h-4 w-4" />
              {isExpanded && (
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Create Poll
                </span>
              )}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={sidebarData.navMain} />
        <NavHistory histories={sidebarData.histories} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
