import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatter } from "@/lib/utils"
import { SafeOrderItem } from "./columns"

interface PopoverProductsProps {
  data: SafeOrderItem[]
}

const PopoverProducts: React.FC<PopoverProductsProps> = ({ data }) => {
  const getProductName = (item: SafeOrderItem) => {
    let name = item.product.name
    if(item.size) {
      name += ` (${item.size.name})`
    }
    if (!item.extras) return name

    if(item.extras.length > 0) {
      name += ` + ${item.extras.map(extra => extra.name).join(', ')}`
    }

    return name
  }

  const getTotalPrice = (item: SafeOrderItem) => {
    const extrasPrice = item.extras?.reduce((acc, item) => acc + item.price, 0) || 0
    const sizePrice = item.size?.price || 0
    const quantity = item.quantity || 0

    if(sizePrice === 0) {
      return (extrasPrice + item.product.price) * quantity
    }

    return (extrasPrice + sizePrice) * quantity
  }

  const total = data.reduce((acc, item) => acc + getTotalPrice(item), 0)

  return (
    <Popover>
      <PopoverTrigger
        asChild
      >
        <Button
          size='sm'
          variant='outline'
        >
            Ver todos
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-fit'
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                  Producto
              </TableHead>
              <TableHead>
                  Comentario
              </TableHead>
              <TableHead>
                  Cantidad
              </TableHead>
              <TableHead>
                  Precio
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item) => (
                <TableRow
                  key={item.id}
                >
                  <TableCell
                    className="max-w-[150px]"
                  >
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
                  <TableCell>
                    {formatter.format(getTotalPrice(item))}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {formatter.format(total)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverProducts