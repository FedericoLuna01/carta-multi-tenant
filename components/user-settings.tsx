import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import UserSettingsForm from "./forms/user-settings-form"
import { UserSettings } from "@prisma/client"

const UserSettings = ({ userSettings }: { userSettings: UserSettings | null }) => {
  return (
    <div
      className="w-full mt-8"
    >
      <Card
        className="max-w-5xl mx-auto"
      >
        <CardHeader>
          <CardTitle>
            Configuración de usuario
          </CardTitle>
          <CardDescription>
            Editá las preferencias de tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserSettingsForm
            userSettings={userSettings}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default UserSettings