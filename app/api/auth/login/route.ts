import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken'

export async function POST (req: Request) {
  const body = await req.json()
  const { email, password } = body

  if (!email) {
    return new NextResponse('Email is required', { status: 400 })
  }

  if (!password) {
    return new NextResponse('Password is required', { status: 400 })
  }

  // Revisar si el usuario existe en la base de datos

  // Si el usuario existe, generar un token
  if (process.env.EMAIL === email && process.env.PASSWORD === password) {
    const token = sign({
      httpOnly: true,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      email,
      authorized: true
    },
      process.env.JWT_SECRET as string
    )

    const response = NextResponse.json({
      token
    })

    response.cookies.set({
      name: 'auth',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })

    return response
  }

  // Si el usuario no existe, retornar un error
  return new NextResponse('Credenciales no válidas.', { status: 401 })

}