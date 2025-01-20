import { cn } from "@/lib/utils"
import { CircleCheckIcon } from "lucide-react"

const Features = () => {
  const featuresLeft = [
    {
      title: "Código QR",
      description: "Los clientes acceden escaneando un código QR sin necesidad de descargar apps.",
    },
    {
      title: "Tienda Online",
      description: "Permití que tus clientes hagan pedidos de Delivery o Take Away directamente.",
    },
    {
      title: "Métodos de Pago",
      description: "Permití pagos con QR, tarjeta, efectivo o transferencia bancaria.",
    },
  ]

  const featuresRight = [
    {
      title: "Delivery / TakeAway",
      description: "Reducí tiempos de espera y mejorá la experiencia de tus clientes.",
    },
    {
      title: "Gestión personalizada",
      description: "Diseñado para que cualquier usuario pueda manejarlo fácilmente.",
    },
    {
      title: "Soporte",
      description: "Cualquier duda o problema que tengas, estamos para ayudarte.",
    },
  ]
  return (
    <section
      id="caracteristicas"
    >
      <div
        className='container flex items-center justify-center flex-col'
      >
        <div className='text-center flex flex-col gap-2'>
          <h2 className='font-bold text-3xl xl:text-5xl'>Simplificamos tu día a día</h2>
          <p className='text-muted-foreground text-xl xl:text-3xl'>
            Vos encargate de la comida, nosotros resolvemos el resto.
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 justify-items-center mt-8 gap-y-8 lg:gap-y-0'>
          <div className="flex flex-col h-full justify-center space-y-12">
            {
              featuresLeft.map((item, index) => (
                <FeatureCard key={index} item={item} side="left" />
              ))
            }
          </div>
          <div>
            <div className='w-[300px] h-[500px] bg-zinc-400'>
              Imagen de la app
            </div>
          </div>
          <div>
            <div className="flex flex-col h-full justify-center space-y-12">
              {
                featuresRight.map((item, index) => (
                  <FeatureCard key={index} item={item} side="right" />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ item, side }: { item: { title: string, description: string }, side: "right" | "left" }) => (
  <div className={cn("max-w-[400px] flex  flex-col-reverse items-center gap-2 lg:gap-5", {
    'lg:flex-row-reverse': side === "right",
    'lg:flex-row': side === "left"
  })}>
    <div className={cn("text-balance text-center", {
      'lg:text-right': side === "left",
      'lg:text-left': side === "right"
    })}>
      <div className={cn("flex gap-2 items-center justify-center flex-row-reverse lg:flex-row lg:justify-end", {
        'lg:flex-row-reverse': side === "right",
      })}>
        <h3 className="font-semibold text-xl">{item.title}</h3>
        <CircleCheckIcon className="text-accentLanding/70 w-8 h-8" />
      </div>
      <p className="text-muted-foreground">
        {item.description}
      </p>
    </div>
  </div>
)

export default Features

