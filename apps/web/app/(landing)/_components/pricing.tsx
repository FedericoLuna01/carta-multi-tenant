import { Button } from "@/components/ui/button"
import { BellRingIcon, CircleCheckIcon } from "lucide-react"

const Pricing = () => {
  return (
    <section className="mt-[20vh]" id="precios">
      <div className="container flex items-center justify-center flex-col">
        <div className="text-center lg:w-8/12 xl:w-7/12">
          <h2 className="text-2xl font-bold md:text-4xl">
            Planes pensados para vos
          </h2>
          <p className="text-xl md:text-2xl mt-2">
            Elegí el plan que mejor se adapte a tus necesidades y comenzá a ofrecer una experiencia moderna y eficiente.
          </p>
        </div>
        <div className="flex gap-8 mt-10 flex-col md:flex-row relative">
          <span className="absolute bg-accentLanding text-white text-xl font-bold px-6 md:px-12 py-2 rounded-xl left-1/2 -translate-x-1/2 md:top-4 top-[45%]">30% OFF</span>
          <div className="text-white bg-black rounded-md p-6 py-12 md:pt-20 pt-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-end gap-4">
                <p>Sólo por esta semana</p>
                <BellRingIcon />
              </div>
              <div className="flex items-end">
                <p className="text-5xl font-bold">$39.999</p>
                <span className="uppercase">/mes</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CircleCheckIcon className="w-6 h-6" />
                <p className="text-xl font-bold">Carta qr</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 flex-col mt-6">
              <p className="uppercase text-sm font-semibold">Ideal si solo querés mostrar tu carta</p>
              <Button
                className="bg-accentLanding font-bold mx-auto hover:bg-accentLanding/80"
                size="lg"
              >
                Probalo gratis
              </Button>
              <p>Sin comisiones ni costos adicionales.</p>
            </div>
          </div>
          <div className="text-white bg-black rounded-md p-6 py-12 md:pt-20 pt-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-end gap-4">
                <p>Sólo por esta semana</p>
                <BellRingIcon />
              </div>
              <div className="flex items-end">
                <p className="text-5xl font-bold">$49.999</p>
                <span className="uppercase">/mes</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CircleCheckIcon className="w-6 h-6" />
                <p className="text-xl font-bold">Carta qr</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CircleCheckIcon className="w-6 h-6" />
                <p className="text-xl font-bold">Delivery / TakeAway</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 flex-col mt-6">
              <p className="uppercase text-sm font-semibold">Ideal si solo querés mostrar tu carta</p>
              <Button
                className="bg-accentLanding font-bold mx-auto hover:bg-accentLanding/80"
                size="lg"
              >
                Probalo gratis
              </Button>
              <p>Sin comisiones ni costos adicionales.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Pricing