import { unstable_noStore as noStore } from "next/cache";

import Carousel from "@/components/carousel/carousel";
import Header from "@/components/header";
import Main from "@/components/main";
import UserInfo from "@/components/user-info";
import prismadb from "@/lib/prismadb";
import BackToTop from "@/components/back-to-top";

export default async function Home() {
  noStore();
  const products = await prismadb.product.findMany({
    where: {
      isPromo: true,
    },
    include: {
      sizes: true,
      extras: true,
    },
  });

  const userSettings = await prismadb.userSettings.findFirst();

  return (
    <>
      <Header image={userSettings?.image} />
      <UserInfo userSettings={userSettings} />
      {products.length > 0 && <Carousel slides={products} />}
      <Main />
      <BackToTop />
    </>
  );
}
