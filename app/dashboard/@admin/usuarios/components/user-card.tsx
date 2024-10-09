import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserNoPass } from "@/types/types";
import { EllipsisVerticalIcon } from "lucide-react";

const UserCard = ({ user }: { user: UserNoPass }) => {
  const { name, email, role, slug } = user;
  return (
    <Card className="w-full max-w-md relative">
      <Button
        size='icon'
        variant="ghost"
        asChild
      >
        <EllipsisVerticalIcon className="w-6 h-6 p-1 rounded-full absolute top-2 right-2" />
      </Button>
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
  )
}

export default UserCard