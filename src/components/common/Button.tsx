import React, { PropsWithChildren } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'outline';
}

const button = tv({
  base: 'hover:text-tetrary h-input w-full select-none rounded-input bg-foreground bg-input p-2 px-8 text-sm text-background transition-colors hover:bg-secondary',
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
