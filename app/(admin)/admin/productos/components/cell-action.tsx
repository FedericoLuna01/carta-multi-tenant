'use client'

import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { Pencil, Trash } from "lucide-react"
import axios from 'axios'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"
import { type Product } from "@prisma/client"

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
      console.log(error)
      toast.error('Algo salio mal')
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
          title='Editar producto'
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
          title='Borrar producto'
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