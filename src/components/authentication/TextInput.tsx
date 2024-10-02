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
          className="w-full overflow-hidden rounded-input h-input border border-accent bg-input pl-4 py-2 text-foreground placeholder-secondary focus:outline-none"
        />
        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
