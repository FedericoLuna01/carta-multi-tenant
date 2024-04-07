import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";

import { ToasterProvider } from "@/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carta - Login",
  description: "Inicia sesión para poder administrar tu carta",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body
        className={`${inter.className}`}
        style={{
          backgroundImage: "url(./background.webp)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <ToasterProvider />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default AdminLayout;
