'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash, Undo2 } from "lucide-react"
import axios from 'axios'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"
import { type Product } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CellActionProps {
  data: Product
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/products/${data.id}`)
      router.refresh()
      toast.success('Producto eliminado')
    } catch (error) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  const handleLastVersion = async () => {
    try {
      setLoading(true)
      await axios.patch(`/api/products/${data.id}/lastChange`)
      router.refresh()
      toast.success('Producto actualizado')
    } catch (error) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
    }
  }

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
            <span className="sr-only">Abrir menu</span>
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
              href={`/admin/productos/${data.id}`}
            >
              <Pencil className="w-5 h-5 mr-2" /> Editar producto
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLastVersion}
          >
            <Undo2 className="w-5 h-5 mr-2" /> Último cambio
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash className="w-5 h-5 mr-2"/>Eliminar producto
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction