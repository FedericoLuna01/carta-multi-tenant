"use client"

import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavItems, userNavItems } from "@/data/data";
import {
  LineChart,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import Logo from "./logo";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const session = useSession();
  const pathname = usePathname();
  const items = session?.data.user.role === UserRole.ADMIN ? adminNavItems : userNavItems;

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex-1">
          <nav className="grid gap-2 font-medium">
            <Logo size='sm' />
            <a href="/dashboard"
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
              onClick={handleClick}
            >
              <LineChart className="h-4 w-4" /> Dashboard
            </a>
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                prefetch={false}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  pathname === item.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
                onClick={handleClick}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav