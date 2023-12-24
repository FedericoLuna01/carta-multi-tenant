import AdminNavbar from "@/components/admin-navbar"

const AdminLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <AdminNavbar />
      <main
        className="pt-20 backdrop-blur-sm min-h-screen"
      >
        <div
          className="container"
        >
          {children}
        </div>
      </main>
    </>
  )
}

export default AdminLayout