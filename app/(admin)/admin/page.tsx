import { unstable_noStore as noStore } from "next/cache"

import AdminAccordion from "@/components/admin-accordion"
import UserSettings from "@/components/user-settings"
import prismadb from "@/lib/prismadb"

const AdminPage = async () => {
  noStore()
  const userSettings = await prismadb.userSettings.findFirst({})

  return (
    <section
      className="flex items-center flex-col"
    >
      <UserSettings
        userSettings={userSettings}
      />
      <AdminAccordion />
    </section>
  )
}

export default AdminPage