import Image from "next/image"
import banner from "@/public/banner.png"

const Header = () => {
  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Image
        src={banner}
        alt="logo"
        // width={1080}
        // height={300}
        className="object-cover mx-auto"
        priority
      />
    </section>
  )
}

export default Header