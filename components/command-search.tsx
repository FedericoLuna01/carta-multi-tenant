'use client'

import { Search } from "lucide-react"
import { useState } from "react"

import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Product } from "@prisma/client"
import useProductModal from "@/hooks/use-product-modal"

const CommandSearch = ({ products }: {products: Product[]}) => {
  const [open, setOpen] = useState(false)
  const { onOpen } = useProductModal()

  return (
    <div>
      <Button
        variant='outline'
        onClick={() => setOpen(true)}
        className="hidden md:flex"
      >
          Buscar productos...
        <Search
          className="w-5 h-5 ml-8"
        />
      </Button>
      <Button
        variant='outline'
        size='icon'
        onClick={() => setOpen(true)}
        className="flex md:hidden"
      >
        <Search
          className="w-5 h-5"
        />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Lomito completo..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Productos">
            {products
              .map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  onSelect={() => {
                    onOpen(product)
                  }}
                >
                  {product.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default CommandSearch