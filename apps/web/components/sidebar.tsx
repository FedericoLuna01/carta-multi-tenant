"use client";

import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavItems, userNavItems } from "@/data/data";
import { LineChart } from "lucide-react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [navigationItems, setNavigationItems] = useState([]);

  useEffect(() => {
    if (session?.user) {
      const items = session.user.role === UserRole.ADMIN ? adminNavItems : userNavItems;
      setNavigationItems(items);
    }
  }, [session, status]);

  // Si la sesión está cargando, mostramos null
  if (status === 'loading') {
    return null;
  }

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary",
            pathname === "/dashboard"
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          )}
        >
          <LineChart className="h-4 w-4" /> Dashboard
        </Link>
        {navigationItems.map((item) => (
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
    </div>
  );
};

export default Sidebar;
