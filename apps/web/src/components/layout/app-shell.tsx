import type { ReactNode } from "react";
import { NavRail } from "@/components/layout/nav-rail";
import { TopBar } from "@/components/layout/top-bar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen bg-canvas text-foreground overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[#1a1d24]"
      >
        Skip to main content
      </a>
      <NavRail />
      <div className="h-full flex flex-col md:pl-[248px]">
        <TopBar />
        <main
          id="main-content"
          className="flex-1 w-full max-w-[1560px] mx-auto overflow-y-auto px-4 py-6 sm:px-6 md:px-8 lg:px-8 lg:py-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
