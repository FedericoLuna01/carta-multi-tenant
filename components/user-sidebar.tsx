"use client";

import { NavItems } from "@/data/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const UserSidebar = () => {
  const pathname = usePathname();
  const params = useParams();
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {NavItems.map((item) => (
        <Link
          key={item.id}
          href={item.href.replace("[slug]", params.slug as string)}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary",
            pathname === item.href.replace("[slug]", params.slug as string)
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

export default UserSidebar;
