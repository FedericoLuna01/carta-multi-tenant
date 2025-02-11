import { unstable_noStore as noStore } from "next/cache";

import Carousel from "@/components/carousel/carousel";
import Header from "@/components/header";
import Main from "@/components/main";
import UserInfo from "@/components/user-info";
import prismadb from "@/lib/prismadb";
import BackToTop from "@/components/back-to-top";
import Navbar from "./_components/navbar";
import WhatsAppButton from "@/components/whatsapp-button";
import UserNotFound from "@/components/user-not-found";
import { UserRole } from "@prisma/client";
import { getUserNoPassBySlug } from "@/utils/user";

export default async function Home({ params }: { params: { slug: string } }) {
  noStore();

  const user = await getUserNoPassBySlug(params.slug);

  if (!user || !user.isActive || user.role !== UserRole.USER) {
    return <UserNotFound />;
  }

  const products = await prismadb.category.findMany({
    where: {
      user: {
        slug: params.slug,
      },
    },
    include: {
      subcategories: {
        include: {
          products: {
            where: {
              isArchived: false,
            },
            include: {
              sizes: true,
              extras: true,
            },
            orderBy: {
              sort: "asc",
            },
          },
        },
        orderBy: {
          sort: "asc",
        },
      },
    },
    orderBy: {
      sort: "asc",
    },
  });

  const carouselProducts = products.flatMap((category) => category.subcategories.map((subcategory) => subcategory.products)).flat().filter((product) => product.isPromo);

  const userSettings = await prismadb.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  return (
    <>
      <Navbar products={products} slug={params.slug} userSettings={userSettings} user={user} />
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
          {carouselProducts.length > 0 && <Carousel user={user} slides={carouselProducts} />}
          <Main user={user} products={products} />
        </div>
        {
          userSettings?.phone && <WhatsAppButton number={userSettings.phone} message={`Hola ${user.name}!`} />
        }
        <BackToTop />
      </div>
    </>
  );
}
