import Link from "next/link";

import { Button } from "./ui/button";
import LogoutButton from "./ui/logout-button";
import MobileAdminNavbar from "./mobile-admin-navbar";
import { NavItems } from "@/data/data";

const AdminNavbar = () => {
  return (
    <header className="h-16 z-50 fixed top-0 w-full border-b border-b-slate-300 backdrop-blur-sm flex items-center justify-between">
      <div className="container flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/admin">Admin</Link>
        </h1>
        <nav>
          <ul className="hidden md:flex items-center justify-between flex-row gap-2">
            {NavItems.map((item) => (
              <li key={item.id}>
                <Button variant="link" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
            <li>
              <LogoutButton />
            </li>
          </ul>
          <MobileAdminNavbar />
        </nav>
      </div>
    </header>
  );
};

export default AdminNavbar;
