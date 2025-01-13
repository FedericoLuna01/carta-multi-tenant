import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md"
  color?: "white" | "black" | "red"
}

const Logo: React.FC<LogoProps> = ({ size = "md", color = "red" }) => {
  const logoSrc = {
    white: "/logoplatoblanco.png",
    black: "/logoplatonegro.png",
    red: "/logoplatorojo.png",
  }
  return (
    <Link
      href="/"
    >
      <Image
        src={logoSrc[color]}
        alt="Plato Menu Logo"
        width={size === "sm" ? 120 : 150}
        height={size === "sm" ? 120 : 150}
      />
      <span className={cn("text-2xl md:text-3xl font-bold sr-only", size === "sm" && "text-xl md:text-2xl")}>Plato</span>
    </Link>
  )
}

export default Logo