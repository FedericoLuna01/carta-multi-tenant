import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserNoPass } from "@/types/types";
import CellAction from "./cell-action";
import { UserRole } from "@prisma/client";

const UserCard = ({ user }: { user: UserNoPass }) => {
  const { name, email, role, slug } = user;
  return (
    <Card className="w-full max-w-md relative">
      <div
        className="absolute top-2 right-2"
      >
        <CellAction data={user} />
      </div>
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
              role === UserRole.ADMIN ? "Administrador" : "Usuario"
            }
          </Badge>
          <span className="text-sm text-muted-foreground">Link: {slug}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCard