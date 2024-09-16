import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/ui/logout-button";
import UserSidebar from "@/components/user-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavItems } from "@/data/data";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Carta - Admin",
  description: "En esta sección podrás administrar tu carta.",
};

export default async function AdminLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // console.log(params.slug);
  const user = await auth();
  console.log({ user });
  // if (!user) {
  //   redirect("/");
  // }

  // if (user.user.slug !== params.slug) {
  //   redirect(`/${user.user.slug}/admin`);
  // }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full min-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/logo.svg" alt="logo" width={30} height={30} />
              <span className="text-2xl font-bold capitalize">
                {params.slug}
              </span>
            </Link>
          </div>
          <div className="sticky top-4">
            <UserSidebar />
            <div className="px-2 lg:px-4 pb-4 mt-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pb-4">
        <header className="flex justify-end h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image src="/logo.svg" alt="logo" width={30} height={30} />
                  <span className="sr-only">{params.slug}</span>
                </Link>
                {NavItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href.replace("[slug]", params.slug as string)}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <LogoutButton />
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
