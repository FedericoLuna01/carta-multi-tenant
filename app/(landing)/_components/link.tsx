"use client"

import { Button } from "@/components/ui/button";
import { cn, scrollTo } from "@/lib/utils";

const Link = ({ item, className }: { item: string, className?: string }) => {
  return (
    <Button
      onClick={() => scrollTo(item.toLowerCase())}
      variant="link"
      className={cn("text-secondary-foreground hover:text-[#ba1e09] hover:underline", className)}
    >
      {item}
    </Button>
  )
}

export default Link