import Image from "next/image"

const Header = () => {
  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Image
        src="/banner.png"
        alt="logo"
        width={1080}
        height={300}
        className="rounded-md object-cover aspect-h-1 mx-auto"
        loading="lazy"
      />
    </section>
  )
}

export default Header