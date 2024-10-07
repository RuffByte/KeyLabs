import React, { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'outline';
}

const button = tv({
  base: 'flex items-center justify-center rounded-md bg-highlight p-2 px-8 text-sm text-background transition-colors *:stroke-background hover:bg-black',
  variants: {
    variant: {
      outline:
        'hover:bg-accent border border-secondary/70 bg-background text-foreground *:stroke-foreground hover:border-foreground',
    },
  },
});

const Button = ({ variant, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(button({ variant: variant }), props.className)}
    >
      {props.children}
    </button>
  );
};

export default Button;
