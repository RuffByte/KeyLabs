import React, { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variants?: 'primary' | 'secondary'
}

const button = tv({
  base: 'rounded-input bg-input h-input px-8 p-2 w-full text-sm text-foregound',
  variants: {
    variant: {
      outline: '',
    },
  },
})

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button {...props} className={cn(button(), props.className)}>
      {props.children}
    </button>
  )
}

export default Button
