'use client'

import { Order } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'place',
    header: 'Ubicación',
  },
  {
    accessorKey: 'comment',
    header: 'Comentario',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      // TODO: Crear componente para cambiar el estado
      return (
        <div>
          {row.original.status}
        </div>
      )
    }
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Fecha',
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.createdAt)
  //     const formattedDate = date.toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  //     return (
  //       <div>
  //         {formattedDate}
  //       </div>
  //     )
  //   }
  // },
  {
    accessorKey: 'createdAt',
    header: 'Horario',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      const formattedTime = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
      return (
        <div>
          {formattedTime}
        </div>
      )
    }
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      return (
        <CellAction
          data={row.original}
        />
      )
    },
  },
]
