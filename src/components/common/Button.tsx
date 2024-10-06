import React, { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'outline';
}

const button = tv({
  base: 'flex justify-center rounded-md bg-highlight p-2 px-8 text-sm text-background text-foreground transition-colors',

  variants: {
    variant: {
      outline:
        'border-accent hover:bg-accent border bg-background text-foreground hover:border-secondary',
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
