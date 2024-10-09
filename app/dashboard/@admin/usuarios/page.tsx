import { Metadata } from "next";

import NewUserModal from "@/components/modals/new-user-modal";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserCard from "./components/user-card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";

export const metadata: Metadata = {
  title: "Carta - Administrar usuarios ",
  description:
    "Demo de carta digital. Una web donde podrás administrar tu carta y tus pedidos.",
};

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      slug: true,
      updatedAt: true,
      createdAt: true,
    },
  })

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between">
        <Heading
          title="Usuarios"
          description="Administra los usuarios de carta"
        />
        <NewUserModal />
      </div>
      <Separator />
      <DataTable columns={columns} data={users} />
      {/* TODO: Agregar tab para tener 2 vistas. 1 de card y otra de tabla */}
      {/* <div className="mt-4 grid grid-cols-4 gap-10">
        {
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        }
      </div> */}
    </div>
  )
}
