import { Metadata } from "next";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import LogoutButton from "@/components/ui/logout-button";
import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import Logo from "@/components/logo";

export const metadata: Metadata = {
  title: "Carta - Admin ",
  description:
    "Demo de carta digital. Una web donde podrás administrar tu carta y tus pedidos.",
  icons: {
    icon: "/favicon.ico",
  },
};

const DashboardLayout = async ({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) => {
  const session = await auth();
  if (!session) redirect("/login");

  if (!session.user) return null;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo size='sm' />
          </div>
          <Sidebar />
          <div className="mt-auto px-2 lg:px-4 pb-4">
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[70px,1fr,auto] pb-4">
        <header className="flex justify-end h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="md:hidden flex mr-auto">
            <LogoutButton />
          </div>
          <MobileNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {session && session.user.role === UserRole.ADMIN ? admin : user}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
