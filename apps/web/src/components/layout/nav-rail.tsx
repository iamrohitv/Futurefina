"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LifeBuoy,
  MessageSquare,
  Settings2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/brand/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getInitials } from "@/lib/format";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/inbox", label: "Inbox", icon: MessageSquare, badge: 6 },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavRail() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[76px] flex-col items-center border-r border-hairline bg-canvas py-4 md:flex">
        <Link
          href="/"
          aria-label="Futurefina CRM — Overview"
          className="rounded-xl focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
        >
          <BrandMark />
        </Link>

        <nav aria-label="Primary" className="mt-8 w-full">
          <ul className="flex flex-col items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              const Icon = item.icon;

              return (
                <li key={item.href} className="w-full">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-label={
                      item.badge
                        ? `${item.label}, ${item.badge} unread`
                        : item.label
                    }
                    className="group flex w-full flex-col items-center gap-1 rounded-lg py-0.5 focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        "relative grid size-11 place-items-center rounded-xl transition-colors",
                        active
                          ? "bg-mint text-[#08120f]"
                          : "text-text-tertiary group-hover:bg-pill group-hover:text-white",
                      )}
                    >
                      <Icon className="size-[18px]" strokeWidth={1.9} />
                      {item.badge ? (
                        <span
                          className={cn(
                            "absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 font-mono text-[10px] font-semibold",
                            active
                              ? "bg-white text-[#08120f]"
                              : "bg-mint text-[#08120f]",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-medium tracking-wide transition-colors",
                        active
                          ? "text-mint"
                          : "text-text-tertiary group-hover:text-text-secondary",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Help and support"
                className="grid size-10 place-items-center rounded-xl text-text-tertiary transition-colors hover:bg-pill hover:text-white focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
              >
                <LifeBuoy className="size-[18px]" strokeWidth={1.9} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Help &amp; support</TooltipContent>
          </Tooltip>

          <div className="h-px w-8 bg-hairline" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                aria-label="Kaushik Raval — Admin settings"
                className="relative grid size-10 place-items-center rounded-full bg-pill font-mono text-[11px] font-semibold text-white ring-2 ring-mint/40 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
              >
                {getInitials("Kaushik Raval")}
                <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-mint ring-2 ring-canvas" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Kaushik Raval · Admin</TooltipContent>
          </Tooltip>
        </div>
      </aside>

      <nav
        aria-label="Mobile primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        <ul className="grid grid-cols-4">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={
                    item.badge
                      ? `${item.label}, ${item.badge} unread`
                      : item.label
                  }
                  className={cn(
                    "relative flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none focus-visible:ring-inset",
                    active ? "text-mint" : "text-text-tertiary",
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.9} />
                  {item.label}
                  {item.badge ? (
                    <span className="absolute top-2 right-[calc(50%-22px)] grid h-4 min-w-4 place-items-center rounded-full bg-mint px-1 font-mono text-[10px] font-semibold text-[#08120f]">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
