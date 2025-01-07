import React from 'react'
import { Button } from './ui/button'
import Logo from './logo'

const UserNotFound = () => {
  return (
    <section>
      <div className='container h-full flex items-center justify-center flex-col'>
        <Logo />
        <h1 className='text-4xl font-bold mt-3'>Este menú puede ser tuyo!</h1>
        <p className='text-xl text-muted-foreground'>
          Si sos el dueño de este local, podés crear tu carta en minutos!
        </p>
        <Button
          className='mt-5'
          asChild
        >
          <a href="https://www.instagram.com/cartadigital.arg/">
            Mas información
          </a>
        </Button>
      </div>
    </section>
  )
}

export default UserNotFound