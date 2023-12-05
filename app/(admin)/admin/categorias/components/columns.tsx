'use client'

import { Category } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
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
