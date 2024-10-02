import { unstable_noStore as noStore } from "next/cache";

import Carousel from "@/components/carousel/carousel";
import Header from "@/components/header";
import Main from "@/components/main";
import UserInfo from "@/components/user-info";
import prismadb from "@/lib/prismadb";
import BackToTop from "@/components/back-to-top";
import Navbar from "@/components/navbar";
import { getUserBySlug } from "@/utils/user";

export default async function Home({ params }: { params: { slug: string } }) {
  noStore();

  const user = await getUserBySlug(params.slug);
  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  // TODO: Traer todo y enviarlo también al nav
  const products = await prismadb.product.findMany({
    where: {
      isPromo: true,
      // userId: user.id,
      user: {
        slug: params.slug,
      }
    },
    include: {
      sizes: true,
      extras: true,
    },
  });

  const userSettings = await prismadb.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  return (
    <>
      <Navbar slug={params.slug} userSettings={userSettings} />
      <div
        className="pt-24"
        style={{
          backgroundImage: "url('/background.webp')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <Header image={userSettings?.image} />
        <div>
          <UserInfo userSettings={userSettings} />
          {products.length > 0 && <Carousel slides={products} />}
          <Main slug={params.slug} />
        </div>
        <BackToTop />
      </div>
    </>
  );
}
