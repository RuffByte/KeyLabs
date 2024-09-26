// TextInput.tsx
import React, { forwardRef } from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ errors, ...props }, ref) => {
    return (
      <div className="mb-2">
        <input
          ref={ref}
          {...props}
          className="w-full overflow-hidden rounded-xl h-input border border-accent bg-input px-6 py-2 text-white placeholder-secondary focus:border-white focus:outline-none"
        />
        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput
