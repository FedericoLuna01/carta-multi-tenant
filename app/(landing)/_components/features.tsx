import { Settings } from "lucide-react"

const Features = () => {
  return (
    <section
      id="caracteristicas"
    >
      <div
        className='container flex items-center justify-center flex-col'
      >
        <div className='text-center max-w-xl'>
          <h2 className='font-bold text-3xl'>Nuestras modernas caracteristicas</h2>
          <p className='text-muted-foreground'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut, tenetur accusantium earum rem suscipit porro? Ad perferendis pariatur velit?</p>
        </div>
        <div className='grid grid-cols-3 justify-items-center mt-8'>
          <div className="flex flex-col h-full justify-between">
            <div className="max-w-[400px] flex items-center gap-5">
              <div className="text-balance text-right ">
                <h3 className="font-semibold text-xl">Auto gestión</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
              </div>
              <div className="p-5 rounded-full bg-[#ffc9c2]">
                <Settings className="text-[#ba1e09] w-8 h-8" />
              </div>
            </div>
            <div className="max-w-[400px] flex items-center gap-5">
              <div className="text-balance text-right ">
                <h3 className="font-semibold text-xl">Auto gestión</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
              </div>
              <div className="p-5 rounded-full bg-[#ffc9c2]">
                <Settings className="text-[#ba1e09] w-8 h-8" />
              </div>
            </div>
            <div className="max-w-[400px] flex items-center gap-5">
              <div className="text-balance text-right ">
                <h3 className="font-semibold text-xl">Auto gestión</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
              </div>
              <div className="p-5 rounded-full bg-[#ffc9c2]">
                <Settings className="text-[#ba1e09] w-8 h-8" />
              </div>
            </div>
            <div className="max-w-[400px] flex items-center gap-5">
              <div className="text-balance text-right ">
                <h3 className="font-semibold text-xl">Auto gestión</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
              </div>
              <div className="p-5 rounded-full bg-[#ffc9c2]">
                <Settings className="text-[#ba1e09] w-8 h-8" />
              </div>
            </div>
          </div>
          <div>
            <div className='w-[300px] h-[500px] bg-zinc-400'>
              Imagen de la app
            </div>
          </div>
          <div>
            <div className="flex flex-col h-full justify-between">
              <div className="max-w-[400px] flex items-center gap-5">
                <div className="p-5 rounded-full bg-[#ffc9c2]">
                  <Settings className="text-[#ba1e09] w-8 h-8" />
                </div>
                <div className="text-balance text-left ">
                  <h3 className="font-semibold text-xl">Auto gestión</h3>
                  <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
                </div>
              </div>
              <div className="max-w-[400px] flex items-center gap-5">
                <div className="p-5 rounded-full bg-[#ffc9c2]">
                  <Settings className="text-[#ba1e09] w-8 h-8" />
                </div>
                <div className="text-balance text-left ">
                  <h3 className="font-semibold text-xl">Auto gestión</h3>
                  <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
                </div>
              </div>
              <div className="max-w-[400px] flex items-center gap-5">
                <div className="p-5 rounded-full bg-[#ffc9c2]">
                  <Settings className="text-[#ba1e09] w-8 h-8" />
                </div>
                <div className="text-balance text-left ">
                  <h3 className="font-semibold text-xl">Auto gestión</h3>
                  <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
                </div>
              </div>
              <div className="max-w-[400px] flex items-center gap-5">
                <div className="p-5 rounded-full bg-[#ffc9c2]">
                  <Settings className="text-[#ba1e09] w-8 h-8" />
                </div>
                <div className="text-balance text-left ">
                  <h3 className="font-semibold text-xl">Auto gestión</h3>
                  <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features