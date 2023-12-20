'use client'

import { ColumnDef } from '@tanstack/react-table'

import { formatter } from '@/lib/utils'
import { Extra, Product, Size, Subcategory } from '@prisma/client'
import CellAction from './cell-action'
import ExtrasTable from './extras-table'

type ProductColumn = Product & {
  sizes: Size[]
  extras: Extra[]
  subcategory: Subcategory
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    enableHiding: false
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
    accessorKey: 'Subcategoría',
    header: () => <div>Subcategoría</div>,
    cell: ({ row }) => (
      <p >{row.original.subcategory.name}</p>
    )
  },
  {
    accessorKey: 'extras',
    header: () => <div className=' text-center'>Extras</div>,
    cell: ({ row }) => {
      if (!row.original.extras || row.original.extras.length <= 0) return (<p className='text-center'>-</p>)
      return (
        <ExtrasTable
          data={row.original.extras}
        />
      )
    }
  },
  {
    accessorKey: 'sizes',
    header: () => <div className=' text-center'>Tamaños</div>,
    cell: ({ row }) => {
      if (!row.original.sizes || row.original.sizes.length <= 0) return (<p className='text-center'>-</p>)
      return (
        <ExtrasTable
          data={row.original.sizes}
        />
      )
    }
  },
  {
    accessorKey: 'isPromo',
    header: () => <div className=' text-center'>Promo</div>,
    cell: ({ row }) => (
      <p className=' text-center'>{row.original.isPromo ? 'Si' : 'No'}</p>
    )
  },
  {
    accessorKey: 'isArchived',
    header: () => <div className=' text-center'>Archivado</div>,
    cell: ({ row }) => (
      <p className=' text-center'>{row.original.isArchived ? 'Si' : 'No'}</p>
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
    id: 'actions',
    header: 'Acciones',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <CellAction
          data={row.original}
        />
      )
    },
  },
]
