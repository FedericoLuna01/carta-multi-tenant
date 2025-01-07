import Footer from "@/components/footer";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  return {
    title: `${capitalize(params.slug)} | Plato Menu`,
    description: ``
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[1fr,auto] min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
