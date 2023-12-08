'use client'

import { formatter } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'
import { Extra, Product, Size, Subcategory } from '@prisma/client'

type ProductColumn = Product & {
  sizes: Size[]
  extras: Extra[]
  subcategory: Subcategory
}

export const columns: ColumnDef<ProductColumn>[] = [
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
    accessorKey: 'Subcategoría',
    header: () => <div >Subcategoría</div>,
    cell: ({ row }) => (
      <p >{row.original.subcategory.name}</p>
    )
  },
  {
    accessorKey: 'extras',
    header: () => <div className=' text-center'>Extras</div>,
    cell: ({ row }) => (
      //TODO: Agregar el popover
      <p className=' text-center'>{row.original.extras[0].name}</p>
    )
  },
  {
    accessorKey: 'sizes',
    header: () => <div className=' text-center'>Tamaños</div>,
    cell: ({ row }) => {
      if (!row.original.sizes || row.original.sizes.length <= 0) return null
      return (
        <p className=' text-center'>{row.original.sizes[0].name}</p>
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
