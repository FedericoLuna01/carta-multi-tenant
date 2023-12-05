'use client'

import { formatter } from '@/lib/utils'
import { Product } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => (
      <div
        className="max-w-[200px]"
      >
        <p
          className='truncate'
        >
          {row.original.description}
        </p>
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => (
      <p>{formatter.format(row.original.price)}</p>
    )
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
