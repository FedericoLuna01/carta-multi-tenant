'use client'

import LoginForm from "@/components/forms/login-form"
import getAuth from "@/actions/getAuth"

const LoginPage = () => {

  // TODO: Arreglar esto
  const handleClick = async () => {
    const auth = await getAuth()
    console.log(auth)
  }

  return (
    <section
      className="backdrop-blur-sm min-h-screen flex justify-center items-center"
      onClick={handleClick}
    >
      <LoginForm />
    </section>
  )
}

export default LoginPage