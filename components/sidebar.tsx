"use client";

import { adminNavItems, userNavItems } from "@/data/data";
import { SidebarNav } from "./sidebar-nav";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

const Sidebar = () => {
  const session = useSession();
  return (
    <div className="flex-1">
      <SidebarNav
        items={
          session.data?.user.role === UserRole.ADMIN
            ? adminNavItems
            : userNavItems
        }
      />
    </div>
  );
};

export default Sidebar;
