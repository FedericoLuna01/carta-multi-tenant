import Image from "next/image";

const Header = ({ image }: { image: string }) => {
  if (!image) {
    return null;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 max-h-[300px]">
      <Image
        src={image}
        alt="Logo de la empresa"
        width={1080}
        height={300}
        className="object-cover mx-auto rounded-md max-h-[300px] object-center"
        priority
      />
    </section>
  );
};

export default Header;
