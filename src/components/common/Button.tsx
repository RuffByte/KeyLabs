import React, { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variants?: 'primary' | 'secondary'
}

const button = tv({
  base: 'flex justify-center rounded rounded-full bg-background-darker bg-white px-4 px-5 py-1 py-2 text-sm text-black text-white hover:bg-gray-100',
  variants: {
    variant: {
      outline: '',
    },
  },
})

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button {...props} className={button()}>
      {props.children}
    </button>
  )
}

export default Button
