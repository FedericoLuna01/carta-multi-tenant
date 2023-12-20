'use client'

import { Trash } from 'lucide-react'

import useCart, { SafeOrderItem } from '@/hooks/use-cart'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import DeleteProductModal from './modals/delete-products-modal'
import { Button } from './ui/button'
import { formatter } from '@/lib/utils'
import useDeleteProductModal from '@/hooks/use-delete-product-modal'
import { getTotalProductPrice } from '@/actions/getTotalPrice'

const CartProductsTable = () => {
  const { onOpen } = useDeleteProductModal()
  const cart = useCart()

  const handleRemove = (item: SafeOrderItem) => {
    if (item.quantity === 1) {
      return cart.removeItem(item.id)
    }
    onOpen(item)
  }

  const total = cart.items.reduce((acc, item) => acc + getTotalProductPrice(item), 0)

  const getProductName = (item: SafeOrderItem) => {
    let name = item.name
    if(item.size) {
      name += ` (${item.size.name})`
    }
    if (!item.extras) return name

    if(item.extras.length > 0) {
      name += ` + ${item.extras.map(extra => extra.name).join(', ')}`
    }

    return name

  }

  return (
    <Table
      className='overflow-auto'
    >
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Aclaraciones</TableHead>
          <TableHead className=" text-center">Cantidad</TableHead>
          <TableHead className="text-right">Precio</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          cart.items.length === 0 &&
          <TableRow>
            <TableCell className='text-center' colSpan={5}>
              No hay productos en el carrito
            </TableCell>
          </TableRow>
        }
        {
          cart.items.map((item) => (
            <TableRow
              key={item.id}
            >
              {/* Modal para eliminar una cantidad especifica */}
              <DeleteProductModal />
              <TableCell>
                {getProductName(item)}
              </TableCell>
              <TableCell>
                {item.options}
              </TableCell>
              <TableCell
                className="text-center"
              >
                {item.quantity}
              </TableCell>
              <TableCell
                className="text-right"
              >
                {formatter.format(getTotalProductPrice(item))}
              </TableCell>
              <TableCell
                className="text-right"
              >
                <Button
                  onClick={() => handleRemove(item)}
                  type='button'
                  variant='destructive'
                  size="icon"
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
      {
        cart.items.length > 0 &&
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {formatter.format(total)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  type='button'
                  variant='destructive'
                  onClick={cart.removeAll}
                  size='sm'
                >
                  Eliminar todo
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
      }
    </Table>
  )
}

export default CartProductsTable