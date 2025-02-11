import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { accordionItems } from "@/data/data"

const Faq = () => {
  return (
    <section id="preguntas">
      <div className="container flex justify-center flex-col">
        <div className="text-center">
          <h2 className="mt-2 text-2xl font-semibold md:text-5xl">
            Preguntas frecuentes
          </h2>
        </div>
        <div className="w-full md:w-[40em] mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {
              accordionItems.map((item, index) => (
                <AccordionItem key={index} value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default Faq