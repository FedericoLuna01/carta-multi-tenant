import { PhoneIcon } from "lucide-react"

const Pricing = () => {
  return (
    <section className="mt-[20vh]" id="precios">
      <div className="container flex items-center justify-center flex-col">
        <div className="text-center lg:w-8/12 xl:w-7/12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            Con este pago mensual tendrás acceso a todos los beneficios de la plataforma
          </h2>
        </div>
        <div
          className="m-auto mt-12 items-center justify-center -space-y-4 md:flex md:space-y-0 md:-space-x-4 xl:w-10/12"
        >
          <div className="group relative z-10 -mx-4 md:mx-0 md:w-6/12">
            <div
              aria-hidden="true"
              className="absolute top-0 h-full w-full rounded-3xl border border-gray-100 dark:border-gray-700 dark:shadow-none bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 transition duration-500 group-hover:scale-105"
            ></div>
            <div className="relative space-y-6 p-8 sm:p-12">
              <div>
                <div className="relative flex justify-around">
                  <div className="flex items-end">
                    <span className="leading-0 text-7xl lg:text-8xl font-bold text-gray-800 dark:text-white">$20.000</span>
                  </div>
                </div>
              </div>
              <ul role="list" className="m-auto w-max space-y-4 py-6 text-gray-600 dark:text-gray-300">
                <li className="space-x-2">
                  <span className="font-semibold text-primary">&check;</span>
                  <span>First premium advantage</span>
                </li>
                <li className="space-x-2">
                  <span className="font-semibold text-primary">&check;</span>
                  <span>Second advantage weekly</span>
                </li>
                <li className="space-x-2">
                  <span className="font-semibold text-primary">&check;</span>
                  <span>Third advantage donate to project</span>
                </li>
              </ul>
              <p
                className="mt-6 flex items-center justify-center space-x-4 text-center text-lg text-gray-600 dark:text-gray-300"
              >
                <span>Hablanos en</span>
                <a href="tel:+24300" className="flex items-center space-x-2 text-primary">
                  <PhoneIcon />
                  <span className="font-semibold">+54 341 312 5385</span>
                </a>
                <span>o</span>
              </p>
              <a href="mailto:" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                <span className="relative text-base font-semibold text-white dark:text-dark">
                  Escribinos un email
                </span>
              </a>
            </div>
          </div>

          <div className="group relative md:w-6/12 lg:w-7/12">
            <div
              aria-hidden="true"
              className="absolute top-0 h-full w-full rounded-3xl border border-gray-100 dark:border-gray-700 dark:shadow-none bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 transition duration-500 group-hover:scale-105"
            ></div>
            <div className="relative p-6 pt-16 md:rounded-r-2xl md:p-8 md:pl-12 lg:p-16 lg:pl-20">
              <ul role="list" className="space-y-4 py-6 text-gray-600 dark:text-gray-300">
                <li className="space-x-2">
                  <span className="font-semibold text-primary">&check;</span>
                  <span>First premium advantage</span>
                </li>
                <li className="space-x-2">
                  <span className="font-semibold text-primary">&check;</span>
                  <span>Second advantage weekly</span>
                </li>
                <li className="space-x-2">
                  <span className="font-semibold text-primary">&check;</span>
                  <span>Third advantage donate to project</span>
                </li>
                <li className="space-x-2">
                  <span className="font-semibold text-primary">&check;</span>
                  <span>Fourth, access to all components weekly</span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-white">
                Team can be any size, and you can add or switch members as needed. Companies using
                our platform include:
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Pricing