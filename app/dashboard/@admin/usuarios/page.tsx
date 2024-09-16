import { Metadata } from "next";

import NewUserModal from "@/components/modals/new-user-modal";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      createdAt: true,
      updatedAt: true,
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
      <div className="mt-4 grid grid-cols-4 gap-10">
        {
          users.map(({ id, name, email, role, slug }) => (
            <Card key={id} className="w-full max-w-md relative">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex flex-col">
                  <CardTitle>{name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {
                      role === "ADMIN" ? "Administrador" : "Usuario"
                    }
                  </Badge>
                  <span className="text-sm text-muted-foreground">Link: {slug}</span>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  )
}
