"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavItems, userNavItems } from "@/data/data";

export const SidebarNav = ({
  items,
}: {
  items: typeof adminNavItems | typeof userNavItems;
}) => {
  const pathname = usePathname();
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <a href="/dashboard">Dashboard</a>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          prefetch={false}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary",
            pathname === item.href
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};