import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";

import AdminNavbar from "@/components/admin-navbar";
import Footer from "@/components/footer";
import { ToasterProvider } from "@/providers/toaster-provider";
import ModalsProviders from "@/providers/modals-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carta - Admin",
  description: "En esta sección podrás administrar tu carta.",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminNavbar />
      <main>
        <div>
          {children}
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
