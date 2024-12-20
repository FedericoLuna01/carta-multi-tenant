"use client"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "./link"
import { landingNavbarItems } from "@/data/data"
import { useState } from "react"

const NavbarMobile = () => {
  const [open, setOpen] = useState(false)
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger
        asChild
      >
        <Button
          size="icon"
          variant="outline"
          className="shrink-0 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo size="sm" />
          </SheetTitle>
          <div className="pt-5">
            <ul className="flex flex-col items-center gap-2">
              {
                landingNavbarItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setOpen(false)}
                  >
                    <Link className="text-xl" item={item.label} />
                  </li>
                ))
              }
            </ul>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default NavbarMobile