import Link from "next/link";
import { Bell, CalendarDays, ChevronDown, Plus, Search } from "lucide-react";
import { BrandMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center gap-3 border-b border-hairline bg-canvas/90 px-4 backdrop-blur-xl sm:px-6">
      <Link
        href="/"
        aria-label="Futurefina CRM — Overview"
        className="rounded-xl focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none md:hidden"
      >
        <BrandMark size="sm" />
      </Link>

      <div className="relative hidden w-full max-w-[420px] lg:block">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-tertiary"
        />
        <label htmlFor="global-search" className="sr-only">
          Search leads, phone numbers, or lead codes
        </label>
        <Input
          id="global-search"
          type="search"
          placeholder="Search leads, phone, or lead code…"
          className="h-9 rounded-full border-hairline bg-card pr-4 pl-9 text-sm placeholder:text-text-tertiary focus-visible:border-mint/60 focus-visible:ring-mint/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <span className="hidden h-9 items-center gap-2 rounded-full border border-hairline bg-card px-3 text-xs font-medium text-text-secondary sm:inline-flex">
          <CalendarDays aria-hidden="true" className="size-3.5" />
          This month
          <ChevronDown
            aria-hidden="true"
            className="size-3.5 text-text-tertiary"
          />
        </span>

        <Button
          asChild
          variant="ghost"
          size="icon"
          className="relative size-9 rounded-full text-text-secondary hover:bg-pill hover:text-white"
        >
          <Link href="/inbox" aria-label="Notifications: 2 urgent handovers">
            <Bell aria-hidden="true" className="size-[18px]" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-mint ring-2 ring-canvas" />
          </Link>
        </Button>

        <Button
          asChild
          className="h-9 rounded-full bg-white px-4 text-[#1a1d24] shadow-[0_8px_24px_-14px_rgba(255,255,255,0.7)] hover:bg-white/90 max-sm:size-9 max-sm:px-0"
        >
          <Link href="/leads" aria-label="New lead">
            <Plus aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">New lead</span>
          </Link>
        </Button>

        <span className="mx-1 hidden h-6 w-px bg-hairline xl:block" />

        <Link
          href="/settings"
          className="hidden items-center gap-2 rounded-full border border-hairline bg-card py-1 pr-3 pl-1.5 transition-colors hover:bg-pill focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none xl:flex"
        >
          <span className="grid size-7 place-items-center rounded-full bg-pill font-mono text-[10px] font-semibold text-white ring-1 ring-mint/30">
            KR
          </span>
          <span className="leading-tight">
            <span className="block text-xs font-medium text-white">
              Kaushik Raval
            </span>
            <span className="block text-[10px] text-text-tertiary">Admin</span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-3.5 text-text-tertiary"
          />
        </Link>
      </div>
    </header>
  );
}
