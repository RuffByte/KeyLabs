// TextInput.tsx
import React, { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string;
  classname?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ errors, classname, ...props }, ref) => {
    return (
      <div className={classname}>
        <input
          ref={ref}
          {...props}
          className="border-accent h-input w-full overflow-hidden rounded-input border bg-input py-2 pl-4 text-foreground placeholder-secondary focus:outline-none"
        />
        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
