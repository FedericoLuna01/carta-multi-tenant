import { socialsItems } from "@/data/data"

const Contact = () => {
  return (
    <section id="contacto" className="">
      <div className="container mb-[20vh]">
        <div className="text-center">
          <p className="font-medium text-[#ba1e09]">Contactanos</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            Encontranos en nuestras redes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cualquier duda que tengas no dudes en contactarnos.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {
            socialsItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="p-3 text-[#ba1e09] rounded-full bg-[#ba1e09]/20">
                  <item.icon />
                </span>
                <h2 className="mt-4 text-lg font-medium">
                  {item.title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {item.description}
                </p>
                <a href={item.href} className="mt-2 text-[#ba1e09]">
                  {item.label}
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Contact