import Image from "next/image"

const Header = () => {
  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Image
        src="/logo-2.jpg"
        alt="logo"
        width={600}
        height={600}
        className="rounded-md object-cover aspect-w-1 aspect-h-1 w-[1000px] h-[400px] mx-auto"
      />
    </section>
  )
}

export default Header