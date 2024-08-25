import type { Metadata } from "next";

import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Carta - Demo",
  description:
    "Demo de carta digital. Una web donde podrás administrar tu carta y tus pedidos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-rows-[1fr,auto] min-h-screen pt-24"
    >
      {children}
      <Footer />
    </div>
  );
}
