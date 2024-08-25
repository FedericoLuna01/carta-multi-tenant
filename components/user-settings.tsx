import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import UserSettingsForm from "./forms/user-settings-form";
import { UserSettings as UserSettingsType } from "@prisma/client";

const UserSettings = ({
  userSettings,
}: {
  userSettings: UserSettingsType | null;
}) => {
  return (
    <div className="w-full">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Configuración de usuario</CardTitle>
          <CardDescription>Edita las preferencias de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <UserSettingsForm userSettings={userSettings} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
