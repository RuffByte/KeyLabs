// TextInput.tsx

import React from 'react'

interface TextInputProps {
  id: string
  type: string
  placeholder: string
  register: any // You can define a more specific type if you prefer
  errors?: string
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="mb-2">
      <input
        type={type}
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className="w-full overflow-hidden rounded-xl border border-transparent bg-background-darker px-5 py-2 text-sm text-white placeholder-secondary-blue focus:border-white focus:outline-none"
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  )
}

export default TextInput
