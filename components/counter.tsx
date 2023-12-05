'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from './ui/button'
import { Product } from '@/types/types'
import useCart from '@/hooks/use-cart'

interface CounterProps {
  data: Product
}

const Counter: React.FC<CounterProps> = ({ data }) => {
  const [counter, setCounter] = useState(1)
  const cart = useCart()

  const onClick = () => {
    cart.addItem({
      ...data,
      quantity: counter
    })
  }

  const handleCountUp = () => {
    setCounter(counter + 1)
  }

  const handleCountDown = () => {
    if (counter <= 1) {
      return toast.error('La cantidad no puede ser menor a 1')
    }

    setCounter(counter - 1)
  }

  return (
    <>
      <div
        className='flex flex-col justify-between items-center gap-3'
      >
        <div
          className='flex flex-row items-center justify-center gap-3'
        >
          <Button
            size='icon'
            variant='outline'
            onClick={handleCountDown}
          >
            -
          </Button>
          <p>{counter}</p>
          <Button
            size='icon'
            variant='outline'
            onClick={handleCountUp}
          >
            +
          </Button>
        </div>
        <Button
          onClick={onClick}
        >
          Agregar
        </Button>
      </div>
    </>
  )
}

export default Counter