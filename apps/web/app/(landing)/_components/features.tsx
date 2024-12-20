import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"

const Features = () => {
  const featuresLeft = [
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
  ]

  const featuresRight = [
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
    {
      title: "Auto gestión",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque?",
      icon: Settings
    },
  ]
  return (
    <section
      id="caracteristicas"
    >
      <div
        className='container flex items-center justify-center flex-col'
      >
        <div className='text-center max-w-xl'>
          <h2 className='font-bold text-3xl'>Nuestras modernas caracteristicas</h2>
          <p className='text-muted-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut, tenetur accusantium earum rem suscipit porro? Ad perferendis pariatur velit?
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 justify-items-center mt-8 gap-y-8 md:gap-y-0'>
          <div className="flex flex-col h-full justify-between space-y-7">
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
            <div className="flex flex-col h-full justify-between space-y-7">
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

const FeatureCard = ({ item, side }: { item: { title: string, description: string, icon: any }, side: "right" | "left" }) => (
  <div className={cn("max-w-[400px] flex  flex-col-reverse md:flex-row items-center gap-2 md:gap-5", {
    'md:flex-row-reverse': side === "right",
    'md:flex-row': side === "left"
  })}>
    <div className={cn("text-balance text-center", {
      'md:text-right': side === "left",
      'md:text-left': side === "right"
    })}>
      <h3 className="font-semibold text-xl">{item.title}</h3>
      <p className="text-muted-foreground">
        {item.description}
      </p>
    </div>
    <div className="p-5 rounded-full bg-[#ffc9c2]">
      <item.icon className="text-[#ba1e09] w-8 h-8" />
    </div>
  </div>
)

export default Features

