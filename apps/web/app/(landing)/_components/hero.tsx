import { Button } from "@/components/ui/button"
import { BellRingIcon } from "lucide-react"
import Image from "next/image"

const Hero = () => {
  return (
    <section id="inicio"
      className=" min-h-[calc(100vh-80px)]"
    >
      <div className="container flex pt-[15vh] md:pt-[20vh] flex-col items-start gap-6">
        <div className="flex justify-between gap-4 w-full">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-4 text-3xl mb-2">
                <BellRingIcon />
                <p>Es hora de digitalizar tu negocio</p>
              </div>
              <div>
                <h1 className=" text-4xl md:text-5xl font-bold">
                  Pedidos, Delivery & Menú Digital
                </h1>
                <p className=" text-lg md:text-5xl relative w-fit">
                  <span className="absolute w-full h-2 bg-accentLanding/70 -z-10 -bottom-1 -skew-x-12" />
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
              src="/qrcode.jpg"
              width={300}
              height={300}
              alt="Código qr en una mesa"
              className="rounded-full aspect-square object-center object-cover"
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