import React from 'react'

const Input = (field, placeholder) => (
    <input className="px-5 py-3 rounded outline-none bg-gray-50 border-4 text-gray-800 font-bold" style={{ borderColor: '#7D5FFF' }} placeholder={placeholder} {...field} />
)

export default Input
