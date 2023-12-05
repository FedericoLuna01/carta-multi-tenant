import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { categories, products } from '@/data/data'
import ProductCard from './ui/product-card'

const Main = () => {
  return (
    <main
      className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28'
    >
      <Accordion type="single" collapsible >
        {
          categories.map((category) => (
            <AccordionItem
              value={`item-${category.id}`}
              key={category.id}
              className='border-b-0 my-[2px]'
            >
              <AccordionTrigger
                className='bg-slate-100
                px-4
                rounded-md
                text-3xl
                uppercase
                font-bold
                '
              >
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <h3
                  className='text-2xl font-semibold ml-4 mt-2 text-slate-800'
                >Subcategoria</h3>
                <div>
                  {
                    products.map((product) => (
                      <ProductCard
                        key={product.name}
                        product={product}
                      />
                    ))
                  }
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </main>
  )
}

export default Main