import { Button } from "@/components/ui/button"
import ButtonScroll from "./scroll"

const Hero = () => {
  return (
    <section id="inicio"
      className="bg-[url('/hero-bg.png')] bg-no-repeat bg-cover bg-center relative"
    >
      <div className="min-h-[calc(100vh-80px)] container flex pt-[20vh] justify-center">
        <div className="max-w-2xl text-center flex items-center justify-start flex-col">
          <span className="text-[#ba1e09] font-bold">
            Seguí tus pedidos en tiempo real
          </span>
          <p className="text-6xl font-extrabold">
            Tu nuevo menú digital en un click!
          </p>
          <p className="text-xl text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dicta laudantium tempore ratione ullam, aliquam molestias et magni dolorum sed!
          </p>
          <div
            className="mt-8 flex gap-4 items-center justify-center"
          >
            <Button
              size='lg'
            >
              Comenzar
            </Button>
            <Button
              size='lg'
              variant="outline"
            >
              Ver demo
            </Button>
          </div>
          <ButtonScroll />
        </div>
        <div className="absolute bg-[#f7270b] text-white w-3/6 bottom-0 flex justify-center items-center gap-20 py-5 px-12 rounded-md translate-y-1/2">
          <div className="flex items-center flex-col text-center">
            <p className="text-5xl font-semibold">
              200+
            </p>
            <p className="text-xl uppercase">
              Restaurantes
            </p>
          </div>
          <span className="w-[1px] h-[100px] bg-white"></span>
          <div className="flex items-center flex-col text-center">
            <p className="text-5xl font-semibold">
              10+
            </p>
            <p className="text-xl uppercase">
              Funcionalidades
            </p>
          </div>
          <span className="w-[1px] h-[100px] bg-white"></span>
          <div className="flex items-center flex-col text-center">
            <p className="text-5xl font-semibold">
              30+
            </p>
            <p className="text-xl uppercase">
              Clientes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero