'use client'

import useCart from '@/hooks/use-cart'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import DeleteProductModal from './modals/delete-products-modal'
import { Button } from './ui/button'
import { formatter } from '@/lib/utils'
import { Trash } from 'lucide-react'
import useDeleteProductModal from '@/hooks/use-delete-product-modal'
import { CartProduct } from '@/types/types'

const CartProductsTable = () => {
  const { onOpen } = useDeleteProductModal()
  const cart = useCart()

  const total = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0)

  const handleRemove = (item: CartProduct) => {
    if (item.quantity === 1) {
      return cart.removeItem(item.id)
    }
    onOpen(item)
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
                {item.name}
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
                {formatter.format(item.price * item.quantity)}
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