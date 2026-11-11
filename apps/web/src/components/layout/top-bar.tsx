import Link from "next/link";
import {
  Bell,
  Calendar,
  ChevronDown,
  Maximize,
  Search,
} from "lucide-react";
import { BrandMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center gap-3 border-b border-hairline bg-canvas/90 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="Futurefina CRM — Overview"
          className="flex items-center gap-2 rounded-xl focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none md:hidden"
        >
          <BrandMark size="sm" />
        </Link>
        <div className="text-lg font-semibold text-white tracking-tight">
          Dashboard
        </div>
      </div>

      <div className="relative flex-1 max-w-[560px]">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-tertiary"
        />
        <label htmlFor="global-search" className="sr-only">
          Search anything
        </label>
        <Input
          id="global-search"
          type="search"
          placeholder="Search anything"
          className="h-9 rounded-full border-hairline bg-card pr-4 pl-9 text-sm placeholder:text-text-tertiary focus-visible:border-green/60 focus-visible:ring-green/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-9 size-9 rounded-full text-text-secondary hover:bg-pill hover:text-white"
          aria-label="Expand view"
        >
          <Maximize className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 size-9 rounded-full text-text-secondary hover:bg-pill hover:text-white"
          aria-label="Calendar"
        >
          <Calendar className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 size-9 rounded-full text-text-secondary hover:bg-pill hover:text-white"
          aria-label="Notifications: 2 urgent handovers"
        >
          <Bell className="size-4" aria-hidden="true" />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-green ring-2 ring-canvas" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 size-9 rounded-full text-text-secondary hover:bg-pill hover:text-white"
          aria-label="Wade Warren — Admin profile"
        >
          <span className="grid h-7 w-7 items-center justify-center rounded-full bg-green font-mono text-[10px] font-semibold text-black ring-2 ring-green/40">
            WR
          </span>
          <ChevronDown className="size-3 text-text-tertiary ml-1" />
        </Button>
      </div>
    </header>
  );
}
