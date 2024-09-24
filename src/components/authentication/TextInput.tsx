// TextInput.tsx

import React from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string
}

const TextInput: React.FC<TextInputProps> = ({ errors, ...props }) => {
  return (
    <div>
      <input
        {...props}
        className="w-full overflow-hidden rounded-xl h-input border border-transparent bg-background-darker px-6 py-2 text-white placeholder-secondary-blue focus:border-white focus:outline-none"
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  )
}

export default TextInput
