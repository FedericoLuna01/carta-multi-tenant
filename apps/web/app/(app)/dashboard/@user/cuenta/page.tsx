import { unstable_noStore as noStore } from "next/cache";

import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserSettingsForm from "@/components/forms/user-settings-form";

const AdminPage = async () => {
  noStore();

  const user = await auth()

  const userSettings = await prismadb.userSettings.findFirst({
    where: {
      user: {
        slug: user.user.slug,
      },
    },
  });

  return (
    <section className="">
      <Heading title="Configuración de usuario" description="Edita las preferencias de tu cuenta" />
      <Separator />
      <UserSettingsForm userSettings={userSettings} />
    </section>
  );
};

export default AdminPage;
