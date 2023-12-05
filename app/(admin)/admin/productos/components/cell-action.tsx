'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { Pencil, Trash } from "lucide-react"

import { Product } from "@/types/types"
import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
  data: Product
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = () => {
    // Hacer que la categoría se elimine
    // axios.delete(`/api/categorias/${data.id}`)
    // try {
    //   setLoading(true)
    //   await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
    //   router.refresh()
    //   toast.success('Color eliminado')
    // } catch (error) {
    //   toast.error('Asegurate de haber eliminado todos los productos que esten usando este color')
    // } finally {
    //   setLoading(false)
    //   setOpen(false)
    // }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      toast.success('Categoría eliminada')
    }, 2000)
  }
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
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
            href={`/admin/productos/${data.id}`}
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