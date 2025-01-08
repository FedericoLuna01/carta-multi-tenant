import { FullData, UserNoPass } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ProductCard from "./ui/product-card";

const Main = async ({ products, user }: { products: FullData[], user: UserNoPass }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <Accordion type="single" collapsible>
        {products.map((category) => (
          <AccordionItem
            value={`item-${category.id}`}
            key={category.id}
            className="border-b-0 my-[4px]"
          >
            <AccordionTrigger
              className="bg-slate-100
                px-4
                rounded-md
                text-3xl
                uppercase
                font-bold
                border
                shadow-sm
                "
            >
              {category.name}
            </AccordionTrigger>
            {category.subcategories.map((subcategory) => (
              <AccordionContent key={subcategory.id}>
                <h4 className="text-2xl text-center font-bold uppercase mt-8">
                  {subcategory.name}
                </h4>
                <div className="flex flex-col space-y-6 items-center lg:items-start w-full">
                  {subcategory.products.map((product) => (
                    <ProductCard user={user} key={product.name} product={product} />
                  ))}
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Main;
