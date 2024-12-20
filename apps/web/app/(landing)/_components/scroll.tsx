"use client"

import { scrollTo } from "@/lib/utils"
import { Mouse } from "lucide-react"

const ButtonScroll = () => {
  return (
    <Mouse onClick={() => scrollTo("caracteristicas")} className="mt-16 w-7 h-7 animate-bounce cursor-pointer" />
  )
}

export default ButtonScroll