"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItems } from "@/data/data";
import LogoutButton from "./ui/logout-button";

const MobileAdminNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex md:hidden"
          variant="outline"
          aria-label="Open navigation"
          size="icon"
          onClick={() => setOpen(!open)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
        </SheetHeader>
        <ul className="flex items-center justify-between flex-col gap-2">
          {NavItems.map((item) => (
            <li key={item.id}>
              <Button variant="link" onClick={() => setOpen(false)} asChild>
                <Link href={item.href} prefetch={false}>
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileAdminNavbar;
