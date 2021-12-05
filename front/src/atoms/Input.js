import React from 'react'

const Input = (field, placeholder, onChange) => (
    <input onChange={onChange} className="px-5 py-3 rounded outline-none bg-gray-50 border-4 text-gray-800 font-bold" style={{ borderColor: '#1F2937' }} placeholder={placeholder} {...field} />
)

export default Input
