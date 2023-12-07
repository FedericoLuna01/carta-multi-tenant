'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { Button } from './button'


const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/auth/logout')
      if (res.status === 200) {
        toast.success('Sesion cerrada correctamente.')
        router.push('/')
      }
    } catch (error: any) {
      toast.error('Error al cerrar sesión.')
      router.refresh()
    }
  }

  return (
    <Button
      variant='destructive'
      onClick={handleLogout}
      size='sm'
    >
      Salir
    </Button>
  )
}

export default LogoutButton