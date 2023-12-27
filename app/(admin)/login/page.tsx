import getAuth from "@/actions/getAuth"
import LoginForm from "@/components/forms/login-form"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const auth = await getAuth()

  if (auth) {
    return redirect('/admin')
  }

  return (
    <section
      className="backdrop-blur-sm min-h-screen flex justify-center items-center"
    >
      <LoginForm />
    </section>
  )
}

export default LoginPage