import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ProductCard from "./ui/product-card";
import { Button } from "./ui/button";
import { FullData } from "@/types/types";

const AdminAccordion = ({ data }: { data: FullData[] }) => {
  return (
    <div className="w-full my-20">
      <div className="max-w-5xl mx-auto">
        <Accordion type="single" collapsible>
          {data.map((category) => (
            <AccordionItem
              value={`item-${category.id}`}
              key={category.id}
              className="border-b-0 my-[2px]"
            >
              <AccordionTrigger
                className="bg-slate-100
                  px-4
                  rounded-md
                  text-3xl
                  font-bold
                  "
              >
                <div className="text-left flex items-center flex-wrap gap-4">
                  <p className="uppercase">{category.name}</p>
                  <Button asChild size="icon" title="Editar categoría">
                    <Link href={`/dashboard/categorias/${category.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id}>
                    <div className="flex items-center justify-center mt-8 gap-4 mb-2">
                      <h4 className="text-2xl text-center font-bold uppercase">
                        {subcategory.name}
                      </h4>
                      <Button asChild size="icon" title="Editar subcategoría">
                        <Link
                          href={`/dashboard/subcategorias/${subcategory.id}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {subcategory.products.map((product) => (
                        <ProductCard
                          key={product.name}
                          product={product}
                          isAdmin
                        />
                      ))}
                      <div className="mx-auto flex justify-center mt-8">
                        <Button asChild>
                          <Link
                            href={`/dashboard/productos/nuevo?subcategory=${subcategory.id}`}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Nuevo Producto
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mx-auto flex justify-center mt-8">
                  <Button asChild>
                    <Link
                      href={`/dashboard/subcategorias/nueva?category=${category.id}`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Subcategoría
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href={`/dashboard/categorias/nueva`}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Categoría
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccordion;
