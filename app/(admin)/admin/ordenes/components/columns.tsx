'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import CellAction from './cell-action'
import { OrderItem, type Order, OrderItemSize, OrderItemExtra, Product } from '@prisma/client'
import { cn } from '@/lib/utils'
import { StatusSelect } from './status-select'
import { Button } from '@/components/ui/button'
import PopoverProducts from './popover-products'

export type SafeOrderItem = OrderItem & {
  size: OrderItemSize | null
  extras: OrderItemExtra[] | null
  product: Product
}

export type OrderColumn = Order & {
  products: SafeOrderItem[]
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    enableHiding: false
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'type',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.original.type
      const label = type === 'DELIVERY' ? 'Delivery' : type === 'TAKEAWAY' ? 'Retiro' : 'Mesa'
      return (
        <div
          className={cn('font-semibold text-center py-1 px-2 rounded-md border-2', {
            'bg-cyan-200 border-cyan-400': type === 'DELIVERY',
            'bg-purple-200 border-purple-400': type === 'TAKEAWAY',
            'bg-blue-200 border-blue-400': type === 'TABLE',
          })}
        >
          {label}
        </div>
      )
    }
  },
  {
    accessorKey: 'place',
    header: 'Ubicación',
    cell: ({ row }) => {
      const place = row.original.place
      return (
        <div
          className='truncate max-w-[150px] hover:visible hover:whitespace-normal hover:overflow-auto'
        >
          {place ? place : '-'}
        </div>
      )
    }
  },
  {
    accessorKey: 'comment',
    header: 'Comentario',
    cell: ({ row }) => {
      const comment = row.original.comment
      return (
        <div
          className='truncate max-w-[150px] hover:visible hover:whitespace-normal hover:overflow-auto'
        >
          {comment ? comment : '-'}
        </div>
      )
    }
  },
  {
    accessorKey: 'products',
    header: 'Productos',
    cell: ({ row }) => {
      return (
        <PopoverProducts
          data={row.original.products}
        />
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: ({ row }) => {
      return (
        <StatusSelect
          order={row.original}
        />
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div
          className='flex items-center justify-center'
        >
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Horario
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      const formattedTime = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
      return (
        <p
          className='text-center'
        >
          {formattedTime}
        </p>
      )
    }
  },
  {
    id: 'actions',
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
