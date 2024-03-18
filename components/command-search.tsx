"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { FullProduct } from "@/types/types";
import useProductModal from "@/hooks/use-product-modal";

const CommandSearch = ({ products }: { products: FullProduct[] }) => {
  const [open, setOpen] = useState(false);
  const { onOpen } = useProductModal();

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="hidden md:flex"
        aria-label="Buscar productos..."
      >
        Buscar productos...
        <Search className="w-5 h-5 ml-8" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="flex md:hidden"
        aria-label="Buscar productos..."
      >
        <Search className="w-5 h-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Lomito completo..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Productos">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => {
                  onOpen(product);
                }}
                className="flex items-center justify-between"
              >
                {product.name}
                <div>
                  {!product.isPromo && product.price && (
                    <span className="ml-2 text-gray-500">${product.price}</span>
                  )}
                  {product.isPromo && (
                    <div>
                      <span className="ml-2 text-gray-500 line-through">
                        ${product.price}
                      </span>
                      <span className="ml-2 text-green-600">
                        ${product.promoPrice}
                      </span>
                    </div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default CommandSearch;
