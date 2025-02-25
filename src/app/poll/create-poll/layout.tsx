"use client";

import { AppSidebar } from "@/components/custom/app-sidebar";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

export default function AiAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[90vh] ">
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-8 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-8">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            <div className="flex flex-col p-4 w-full h-full">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    </div>
  );
}
