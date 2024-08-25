import type { Metadata } from "next";

import AdminNavbar from "@/components/admin-navbar";

export const metadata: Metadata = {
  title: "Carta - Admin",
  description: "En esta sección podrás administrar tu carta.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavbar />
      <main className="container">
        {children}
      </main>
    </>
  );
};

