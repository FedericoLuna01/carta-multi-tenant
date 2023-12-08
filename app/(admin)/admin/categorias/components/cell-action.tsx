'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { Pencil, Trash } from "lucide-react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"
import { type Category } from "@prisma/client"
import { useRouter } from "next/navigation"

interface CellActionProps {
  data: Category
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/categories/${data.id}`)
      router.refresh()
      toast.success('Categoría eliminada')
    } catch (error) {
      toast.error('Asegurate de haber eliminado todas las subcategorias que esten usando esta categoría')
    } finally {
      setLoading(false)
      setIsOpen(false)
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
      <div
        className="space-x-2"
      >
        <Button
          size='icon'
          variant='outline'
          asChild
          title='Editar categoría'
        >
          <Link
            href={`/admin/categorias/${data.id}`}
          >
            <Pencil className="w-5 h-5" />
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