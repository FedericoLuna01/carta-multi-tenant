'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { Eye, MoreHorizontal, Phone, Trash } from "lucide-react"
import axios from 'axios'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"
import { type Order } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
      toast.success('Orden eliminada')
    } catch (error) {
      console.log(error)
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  const message = `Hola ${data.name}.`

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
          >
            <Link
              href={`/admin/ordenes/${data.id}`}
            >
              <Eye className="w-5 h-5 mr-2" /> Ver orden
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Pencil className="w-5 h-5 mr-2" /> Editar orden
          </DropdownMenuItem> */}
          <DropdownMenuItem
            asChild
          >
            <Link
              href={`https://wa.me/${data.phone}?text=${message}`}
              target="_blank"
            >
              <Phone className="w-5 h-5 mr-2" />Enviar mensaje
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash className="w-5 h-5 mr-2"/>Eliminar orden
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction