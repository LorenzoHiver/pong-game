import React from 'react'

const Error = ({ text, emoji }) => (
    <div className="absolute py-3 px-6 bg-red-500 rounded " style={{ top: 'calc(50% + 120px)' }}>
        <p className="font-bold text-white">{text} <span className='font-normal'>{emoji}</span></p>
    </div>
)

export default Error
