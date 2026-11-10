"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
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

interface NavSection {
  label: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Main",
    items: [
      { href: "/", label: "Overview", icon: LayoutDashboard },
      { href: "/inbox", label: "Inbox", icon: MessageSquare, badge: 6 },
      { href: "/leads", label: "Leads", icon: Users },
      { href: "/settings", label: "Settings", icon: Settings2 },
    ],
  },
  {
    label: "Performance",
    items: [
      { href: "/", label: "Sales Performance", icon: BarChart3 },
      { href: "/leads", label: "User / Customer Metrics", icon: Users },
      { href: "/inbox", label: "Growth Trends", icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: Settings2 },
      { href: "/", label: "Integrations", icon: Settings2 },
      { href: "/", label: "Help & Support", icon: LifeBuoy },
    ],
  },
];

function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavRail() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-[248px] flex-col border-r border-hairline bg-canvas md:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <Link
            href="/"
            aria-label="Futurefina CRM — Overview"
            className="flex items-center gap-2 rounded-xl focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none"
          >
            <BrandMark />
            <span className="text-sm font-bold tracking-tight text-white">Futurefina</span>
          </Link>
        </div>

        <nav aria-label="Primary" className="mt-6 px-3">
          {NAV_SECTIONS.map((section, sIdx) => (
            <div key={section.label} className="mb-4">
              <h3 className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-text-tertiary uppercase">
                {section.label}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item, iIdx) => {
                  const active = isActivePath(pathname, item.href);
                  const Icon = item.icon;

                  return (
                    <li key={`item-${sIdx}-${iIdx}`}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        aria-label={
                          item.badge
                            ? `${item.label}, ${item.badge} unread`
                            : item.label
                        }
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-white text-black"
                            : "text-text-secondary hover:bg-pill hover:text-white",
                        )}
                      >
                        <Icon className="size-4" strokeWidth={2} />
                        <span className="font-medium">{item.label}</span>
                        {item.badge ? (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[9px] font-semibold bg-green text-black">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3 px-3 pb-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Help and support"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-pill hover:text-white"
              >
                <LifeBuoy className="size-4" strokeWidth={2} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Help &amp; support</TooltipContent>
          </Tooltip>

          <div className="h-[1px] w-8 bg-hairline" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                aria-label="Wade Warren — Admin"
                className="flex items-center gap-2 rounded-full px-2 py-1.5 text-white hover:bg-pill"
              >
                <div className="relative">
                  <span className="relative grid h-7 w-7 items-center justify-center rounded-full bg-green font-mono text-[10px] font-semibold text-black ring-2 ring-green/40">
                    {getInitials("Wade Warren")}
                  </span>
                  <span className="absolute right-0 bottom-0 size-2 rounded-full bg-green ring-2 ring-canvas" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-white leading-tight">
                    Wade Warren
                  </p>
                  <p className="text-[10px] text-text-tertiary leading-tight">
                    Admin
                  </p>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Wade Warren · Admin</TooltipContent>
          </Tooltip>
        </div>
      </aside>

      <nav
        aria-label="Mobile primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        <ul className="grid grid-cols-4">
          {NAV_SECTIONS[0].items.map((item, iIdx) => {
            const active = isActivePath(pathname, item.href);
            const Icon = item.icon;

            return (
              <li key={`mobile-${iIdx}`}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={
                    item.badge
                      ? `${item.label}, ${item.badge} unread`
                      : item.label
                  }
                  className={cn(
                    "relative flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-green focus-visible:outline-none focus-visible:ring-inset",
                    active ? "text-green" : "text-text-tertiary",
                  )}
                >
                  <Icon className="size-5" strokeWidth={2} />
                  {item.label}
                  {item.badge ? (
                    <span className="absolute top-2 right-[calc(50%-22px)] grid h-4 min-w-4 items-center justify-center rounded-full px-1 font-mono text-[9px] font-semibold bg-green text-black">
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
