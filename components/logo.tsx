import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md"
}

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2"
    >
      <Image
        src="/logo.svg"
        alt="Carta"
        width={size === "sm" ? 35 : 50}
        height={size === "sm" ? 35 : 50}
      />
      <span className={cn("text-2xl md:text-3xl font-bold", size === "sm" && "text-xl md:text-2xl")}>Carta</span>
    </Link>
  )
}

export default Logo