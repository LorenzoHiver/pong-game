import React from 'react'

const Box = ({ children, style }) => (
    <div className='px-10 py-3 absolute rounded flex flex-col justify-center items-center' style={style} >
        {children}
    </div>
)

export default Box
