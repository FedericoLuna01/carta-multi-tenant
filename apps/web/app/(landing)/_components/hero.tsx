import { Button } from "@/components/ui/button"
import { BellRingIcon } from "lucide-react"
import Image from "next/image"

const Hero = () => {
  return (
    <section id="inicio"
      className=" min-h-[calc(100vh-80px)]"
    >
      <div className="container flex pt-[8vh] md:pt-[10vh] flex-col lg:items-start gap-6">
        <div className="flex justify-between items-center gap-24 lg:gap-4 w-full flex-col lg:flex-row">
          <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-lg lg:text-3xl mb-2">
                <BellRingIcon className="h-5 w-5 lg:h-7 lg:w-7 " />
                <p>Es hora de digitalizar tu negocio</p>
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start gap-2">
                <h1 className=" text-4xl md:text-5xl font-bold">
                  Pedidos, Delivery & Menú Digital
                </h1>
                <p className="text-3xl md:text-5xl relative w-fit">
                  <span className="absolute w-full h-1 lg:h-2 bg-accentLanding/70 -bottom-0 lg:-z-10 lg:-bottom-1 -skew-x-12" />
                  sin comisiones...
                </p>
              </div>
            </div>
            <div>
              <p className="text-3xl uppercase font-bold">
                Todo en un plato
              </p>
            </div>
            <Button size="lg" className="w-fit">
              ¿Cómo funciona?
            </Button>
          </div>
          <div>
            <Image
              src="/demo.png"
              width={600}
              height={600}
              alt="Código qr en una mesa"
            // className="rounded-full aspect-square object-center object-cover"
            />
          </div>
        </div>
        <div className="mx-auto w-5/6 text-center bg-zinc-200 h-[70vh] rounded-lg mt-[10vh] border-accentLanding/70 border-2">
          Video
        </div>
      </div>
    </section>
  )
}

export default Hero