import { Clock, Contact } from "lucide-react";

import { UserSettings } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import StatusBadge from "./status-badge";

const UserInfo = ({ userSettings }: { userSettings: UserSettings | null }) => {
  if (!userSettings) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Card className="bg-slate-100 grid grid-cols-1 md:grid-cols-2">
        <div>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock />
              <CardTitle>Horarios</CardTitle>
              <StatusBadge userSettings={userSettings} />
            </div>
            <CardDescription>
              Estos son los horarios de atención de nuestro local
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-xl">Día</p>
                <p>
                  Desde {userSettings.dayOpenTime} hasta{" "}
                  {userSettings.dayCloseTime}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-xl">Noche</p>
                <p>
                  Desde {userSettings.nightOpenTime} hasta{" "}
                  {userSettings.nightCloseTime}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
        <div>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Contact className="mr-2" />
              Contacto
            </CardTitle>
            <CardDescription>
              Estos son los datos de contacto de nuestro local
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-xl">Dirección</p>
                <p>{userSettings.location}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-xl">Teléfono</p>
                <p>{userSettings.phone}</p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
};

export default UserInfo;
