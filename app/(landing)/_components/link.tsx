"use client"

import { Button } from "@/components/ui/button";
import { scrollTo } from "@/lib/utils";

const Link = ({ item }: { item: string }) => {
  return (
    <Button
      onClick={() => scrollTo(item.toLowerCase())}
      variant="link"
      className="text-secondary-foreground hover:text-[#ba1e09] hover:underline"
    >
      {item}
    </Button>
  )
}

export default Link