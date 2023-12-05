import Header from "@/components/header"
import { Button } from "@/components/ui/button"

const AdminPage = () => {
  return (
    <section
      className="flex items-center flex-col"
    >
      <Header />
      <div
        className="space-x-4"
      >
        <Button
          className="mt-5"
        >
          Cambiar logo
        </Button>
        <Button
          className="mt-5"
          variant='outline'
        >
          Cambiar fondo
        </Button>
      </div>
    </section>
  )
}

export default AdminPage