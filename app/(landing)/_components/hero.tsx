import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <section id="inicio">
      <div className="min-h-[80vh] container grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div>
          <div>
            <span className="text-[#ba1e09] font-bold">
              Seguí tus pedidos en tiempo real
            </span>
            <p className="text-6xl font-extrabold">
              Tu nuevo menú digital!
            </p>
            <p className="text-xl text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dicta laudantium tempore ratione ullam, aliquam molestias et magni dolorum sed!
            </p>
            <Button
              size='lg'
              className="mt-8"
            >
              Comenzar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-[repeat(2,200px)] gap-8">
          <div className="rounded-md w-full h-full bg-zinc-400"></div>
          <div className="rounded-md w-full h-full bg-zinc-400 col-span-2"></div>
          <div className="rounded-md w-full h-full bg-zinc-400 col-span-2"></div>
          <div className="rounded-md w-full h-full bg-zinc-400"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero