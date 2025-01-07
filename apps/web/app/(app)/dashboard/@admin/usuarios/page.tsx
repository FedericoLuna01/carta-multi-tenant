import { Metadata } from "next";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserCard from "./components/user-card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: "Plato - Administrar usuarios ",
};

export default async function UsersPage() {
  const users = await prismadb.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      slug: true,
      isActive: true,
      updatedAt: true,
      createdAt: true,
    },
  })

  return (
    <div className="">
      <div className="flex flex-row items-center justify-between">
        <Heading
          title="Usuarios"
          description="Administra los usuarios de plato"
        />
        <Button
          asChild
        >
          <Link
            href="/dashboard/usuarios/nuevo"
          >
            Nuevo usuario
          </Link>
        </Button>
      </div>
      <Separator />
      <div className="mt-4">
        <Tabs defaultValue="grid">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="table">Tabla</TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
              {
                users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))
              }
            </div>
          </TabsContent>
          <TabsContent value="table">
            <DataTable columns={columns} data={users} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
