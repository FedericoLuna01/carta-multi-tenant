import AdminNavbar from "@/components/admin-navbar"

const AdminLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <AdminNavbar />
      <section
        className="pt-20 container backdrop-blur-sm min-h-screen"
      >
        {children}
      </section>
    </>
  )
}

export default AdminLayout