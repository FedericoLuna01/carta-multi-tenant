'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { Eye, Pencil, Phone, Trash } from "lucide-react"
import axios from 'axios'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"
import { type Order } from "@prisma/client"

interface CellActionProps {
  data: Order
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/orders/${data.id}`)
      router.refresh()
      toast.success('Producto eliminado')
    } catch (error) {
      console.log(error)
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  const message = `Hola ${data.name}, tu orden esta en camino.`

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div
        className="space-x-2"
      >
        <Button
          size='icon'
          variant='outline'
          asChild
          title='Ver orden'
        >
          <Link
            href={`/admin/pedidos/ver/${data.id}`}
          >
            <Eye className="w-5 h-5" />
          </Link>
        </Button>
        <Button
          size='icon'
          variant='outline'
          asChild
          title='Editar orden'
        >
          <Link
            href={`/admin/pedidos/${data.id}`}
          >
            <Pencil className="w-5 h-5" />
          </Link>
        </Button>
        <Button
          size='icon'
          variant='outline'
          asChild
          title='Enviar mensaje'
        >
          <Link
            href={`https://wa.me/${data.phone}?text=${message}`}
            target="_blank"
          >
            <Phone className="w-5 h-5" />
          </Link>
        </Button>
        <Button
          size='icon'
          variant='destructive'
          title='Borrar categoría'
        >
          <Trash
            className="w-5 h-5"
            onClick={() => setIsOpen(true)}
          />
        </Button>
      </div>
    </>
  )
}

export default CellAction